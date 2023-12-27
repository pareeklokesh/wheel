//<![CDATA[

    var mainChart;
var chartConfig = {
        chart: {
            type: 'pie',
            renderTo: 'chart1'
        },
        title: {
            text: null
        },
        plotOptions: {
            series: {
                center: ['50%', '50%'],
                borderWidth: 0,
                states: {
                    hover: {
                        enabled: true
                    },
                    inactive: {
                        enabled: false
                    },
                    normal: {
                        animation: false
                    }
                },
                stickyTracking: true
            },
            pie: {
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    inside: true,
                    allowOverlap: true,
                    useHTML: true,
                    rotation: 0,
                    style: {
                        "fontSize": "0.8rem",
                        "fontFamily": "Code Pro Bold LC",
                        "textOutline": "",
                        //textOverflow: 'clip'
                    },
                    //format: "<strong>{point.name}</strong>",
                    inside: true,
                    //colorByPoint: true,
                    //color: '{point.textcolor}'
                    formatter: function () {
                        return "<strong style=color:" + (this.point.textcolor) + ";margin-top:" + (this
                            .point.margin) + "px;display:block;>" + (this.point.name) + "</strong>"
                    }
                },
                point: {
                    events: {
                        click: function (event) {
                            event.stopPropagation();
                            console.log(event);
                            $("#info_vendor_logos").html("");
                            $("#resources").html("");
                            $("#title").html("");
                            $("#description").html("");
                            $("#vendorsinarea").html(event.point.name);

                            $("#title").html(event.point.name.replace('<br>','&nbsp;'));
                            $("#description").html(event.point.description);
                            $("#vendorsinarea").html(event.point.name.replace('<br>','&nbsp;'));

                            $.each(event.point.vendors, function (i, item) {
                                $('<img>', {
                                    class: 'info_vendor_logos',
                                    title: item,
                                    src: 'https://www.e92plus.com/img/logos/vendors/' + item.replace(" ", "") + '_logo.svg'
                                }).appendTo('#info_vendor_logos');
                            });

                            $.each(event.point.resources, function (i, item) {
                                $('<a>', {
                                    class: 'main_button bg_blue white center info_resource_button',
                                    href: item.url,
                                    target: '_blank'
                                }).html(item.title).appendTo('#resources');
                            });

                            $(".main").fadeOut();
                            $(".info").fadeIn();
                        }
                    }
                },
            },
        },
        tooltip: {
            enabled: false
        },
        xAxis: {
            labels: {
                enabled: false
            }
        },
        yAxis: {
            labels: {
                enabled: false
            }
        },
        series: [
        {
            dataLabels: {
                distance: -70,
            },
            name: 'Inner',
            data: [],
            size: '42%',
            innerSize: '0%',
            slicedOffset: 0
        },
        {
            name: 'Middle',
            dataLabels: {
                distance: -60,
            },
            data: [],
            size: '73%',
            innerSize: '63%',
            slicedOffset: 0
        },
        {
            name: 'Outer',
            dataLabels: {
                distance: -50,
            },
            data: [],
            size: '100%',
            innerSize: '77%',
            slicedOffset: 0
        }],
        colors:{
        a: '247,116,34',
        b: '227,23,55',
        c: '134,34,247',
        d: '41,181,171',
        inner: '240,242,244',
        middle: '240,242,244',
        outer: '240,242,244'
    }
};

(function (H) {
    //Highcharts.Chart.prototype.callbacks.push(function (chart) {
    //    //$(chart.container).find(".highcharts-series-group").mouseout(function () {
    //    //    chart.series.forEach(function (s) {
    //    //        s.setState('inactnormalive', false);
    //    //    });
    //    //});
    //    //H.addEvent(chart.container, 'mouseleave', function () {
    //    //    chart.series.forEach(function (s) {
    //    //        s.setState('inactive', true);
    //    //    });
    //    //});
    //});
}(Highcharts));

//
//    FULL DATASET
//

$.support.cors = true;

$.ajax({
    type: "GET",
    url: "https://www.e92plus.com/js/securitymaturitywheel/securitymaturitywheel_data.json",
    beforeSend: function (xhr) { },
    crossDomain: true,
    data: {},
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
        // CHART 1
        var chart1 = $.extend({}, chartConfig);
        var allItemsToCheck = $.merge($.merge($.merge([], data.inner), data.middle), data.outer);

        var vendorList = [];
        var threatList = [];

        $.each(allItemsToCheck, function (i, item) {
            //Check Vendors
            $.each(item.vendors, function (i, vendorName) {
                var vendorNameFormatted = vendorName;
                //switch (vendorName) {
                //    case "trendmicro":
                //        vendorNameFormatted = "trend micro";
                //        break;
                //}
                //check if vendor is in list
                if (vendorList.includes(vendorNameFormatted) === false) {
                    //if not add it
                    vendorList.push(vendorNameFormatted);
                }
            });

            //Check Threats
            $.each(item.threats, function (i, threatName) {
                var threatNameFormatted = threatName;
                //switch (vendorName) {
                //    case "trendmicro":
                //        vendorNameFormatted = "trend micro";
                //        break;
                //}
                //check if vendor is in list
                if (threatList.includes(threatNameFormatted) === false) {
                    //if not add it
                    threatList.push(threatNameFormatted);
                }
            });
        });
        vendorList = vendorList.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        threatList = threatList.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        //Build Filter Menu
        //Vendor
        $('#type-1').html('');
        $.each(vendorList, function (i, item) {
            $('<p>', {
                id: item,
                class: 'vendorFilterItem',
            }).html(item).appendTo('#type-1');
        });
        //Threat
        $('#type-2').html('');
        $.each(threatList, function (i, item) {
            $('<p>', {
                id: item,
                class: 'threatFilterItem',
            }).html(item).appendTo('#type-2');
        });

        chart1.series[0].data = data.inner;
        chart1.series[1].data = data.middle;
        chart1.series[2].data = data.outer;

        mainChart = new Highcharts.Chart(chart1);

        $("[name=toggle]").click(function () {
            Highcharts.each(mainChart.series, function (series) {
                Highcharts.each(series.data, function (point) {
                    $(point.graphic.element).removeClass("highcharts-point-filtered");
                });
            });

            $('.toHide').hide();
            $("#type-" + $(this).val()).show();
        });

        //Filter By Selected Vendor
        $(document).on('click', ".vendorFilterItem", function () {
            $(".vendorFilterItem").removeClass("FilterActive");
            $(".threatFilterItem").removeClass("FilterActive");
            $(this).addClass("FilterActive");
            var selectedVendorName = this.id;
            Highcharts.each(mainChart.series, function (series) {
                Highcharts.each(series.data, function (point) {
                    $(point.graphic.element).addClass("highcharts-point-filtered");
                    //point.setState('inactive');
                    //point.select(false, true);
                    if (point.vendors.includes(selectedVendorName)) {
                        $(point.graphic.element).removeClass("highcharts-point-filtered");
                        //point.select(true, true);
                        //point.setState('normal');
                    }
                    console.log(point.graphic.element);
                });
            });
        });
        //Filter By Selected Threat
        $(document).on('click', ".threatFilterItem", function () {
            $(".vendorFilterItem").removeClass("FilterActive");
            $(".threatFilterItem").removeClass("FilterActive");
            $(this).addClass("FilterActive");
            var selectedThreatName = this.id;
            Highcharts.each(mainChart.series, function (series) {
                Highcharts.each(series.data, function (point) {
                    $(point.graphic.element).addClass("highcharts-point-filtered");
                    //point.setState('inactive');
                    if (point.threats.includes(selectedThreatName)) {
                        $(point.graphic.element).removeClass("highcharts-point-filtered");
                        //point.select(true, true);
                        //point.setState('normal');
                    }
                });
            });
        });

        $('#close').click(function () {
            mainChart.redraw();

            $(".info").fadeOut();
            $(".main").fadeIn();
        });
    },
    failure: function (response) {
        console.log(response);
    }
});


//]]>

// tell the embed parent frame the height of the content
if (window.parent && window.parent.parent) {
    window.parent.parent.postMessage(["resultsFrame", {
        height: document.body.getBoundingClientRect().height,
        slug: "hmj1dwye"
    }], "*")
}

// always overwrite window.name, in case users try to set it manually
window.name = "result"