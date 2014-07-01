//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            //YOUR FUNCTION NAME
            var fname = 'swapsort';

            var checkioInput = data.in;

            var checkioInputStr = fname + '(' + JSON.stringify(checkioInput).replace("[", "(").replace("]", ",)") + ')';

            var failError = function (dError) {
                $content.find('.call').html('Fail: ' + checkioInputStr);
                $content.find('.output').html(dError.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
            };

            if (data.error) {
                failError(data.error);
                return false;
            }

            if (data.ext && data.ext.inspector_fail) {
                failError(data.ext.inspector_result_addon);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];
            var result_show = result_addon[0];
            var result_message = result_addon[1];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: ' + checkioInputStr);
                $content.find('.answer').html(result_message);
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: ' + checkioInputStr);
                $content.find('.answer').remove();
            }

            var canvas = new SwapSort();
            canvas.draw($content.find(".explanation")[0], checkioInput);
            if (result_show) {
                canvas.play(userResult);
            }


            this_e.setAnimationHeight($content.height() + 60);

        });

        //This is for Tryit (but not necessary)
//        var $tryit;
//        ext.set_console_process_ret(function (this_e, ret) {
//            $tryit.find(".checkio-result").html("Result<br>" + ret);
//        });
//
//        ext.set_generate_animation_panel(function (this_e) {
//            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
//            $tryit.find('.bn-check').click(function (e) {
//                e.preventDefault();
//                this_e.sendToConsoleCheckiO("something");
//            });
//        });

        var SwapSort = function (options) {
            options = options || {};

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var padding = 10;
            var w = 20;
            var unit = 30;

            var paper;
            var sizeX, sizeY;
            var rods = [];
            var sorted;
            var ar;

            var attrRod = {"stroke-width": 0};
            var attrNumb = {"stroke": colorBlue4, "font-family": "Robotic, Verdana, Geneva, sans-serif", "font-size": w};


            this.draw = function(dom, data) {
                ar = data.slice();
                sorted = data.slice();
                sorted.sort();
                sizeX = data.length * (padding + w);
                sizeY = Math.max.apply(Math.max, data) * unit;
                var centerY = sizeY / 2;
                paper = Raphael(dom, sizeX, sizeY);
                for (var i = 0; i < data.length; i++) {
                    var el = paper.set();
                    el.push(paper.rect(padding * (i + 0.5) + w * i, centerY - data[i] * unit / 2, w, data[i] * unit, unit / 4).attr(
                        attrRod).attr("fill", data[i] === sorted[i] ? colorBlue2 : colorOrange2));
                    el.push(paper.text((padding + w) * (i + 0.5), centerY, data[i]).attr(attrNumb));
                    rods.push(el);
                }
            };

            this.play = function(result) {
                var actions = result.split(",");
                if (actions.length === 1 && actions[0] === '') {
                    return false;
                }
                var i = 0;
                var timeStep = 500;
                (function swap() {
                    if (i >= actions.length) {
                        return false;
                    }
                    var act = actions[i];
                    var f = Number(act[0]);
                    var s = Number(act[1]);
                    i++;
                    var temp = ar[f];
                    ar[f] = ar[s];
                    ar[s] = temp;
                    temp = rods[f];
                    rods[f] = rods[s];
                    rods[s] = temp;

                    rods[s].animate({"transform": "...t" + ((s - f) * unit) + ",0"}, timeStep);
                    rods[s][0].animate({"fill": sorted[s] === ar[s] ? colorBlue2 : colorOrange2}, timeStep);
                    rods[f].animate({"transform": "...t" + ((f - s) * unit) + ",0"}, timeStep);
                    rods[f][0].animate({"fill": sorted[f] === ar[f] ? colorBlue2 : colorOrange2}, timeStep, callback=swap);

                })();
            }

        };

        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);
