//功能：抽象ECharts 作者：李凯 日期：2015-03-02 状态：待完善
var ECharts =
    {
        ChartConfig: function (container, option) {//container:为页面要渲染图表的容器，option为已经初始化好的图表类型的option配置

            require.config({//引入常用的图表类型的配置
                paths: {
                    echarts: URL('/Scripts/echarts-2.2.0/dist/echarts'),
                    'themes': URL('/Scripts/echarts-2.2.0/theme/macarons'),
                    'echarts/chart/line': URL('/Scripts/echarts-2.2.0/dist/chart/line'),
                    'echarts/chart/bar': URL('/Scripts/echarts-2.2.0/dist/chart/bar'),
                    'echarts/chart/pie': URL('/Scripts/echarts-2.2.0/dist/chart/pie')
                }
            });
            this.option = { chart: {}, option: option, container: container };
            return this.option;
        },
        ChartDataFormate: {
            FormateNOGroupData: function (data) {//data的格式如上的Result1，这种格式的数据，多用于饼图、单一的柱形图的数据源
                var categories = [];
                var datas = [];
                for (var i = 0; i < data.length; i++) {
                    categories.push(data[i].name || "");
                    datas.push({ name: data[i].name, value: data[i].value || 0 });
                }
                return { category: categories, data: datas };
            },
            FormateGroupData: function (data, type, is_stack) {//data的格式如上的Result2，type为要渲染的图表类型：可以为line，bar，is_stack表示为是否是堆积图，这种格式的数据多用于展示多条折线图、分组的柱图
                var chart_type = 'line';
                if (type)
                    chart_type = type || 'line';
                var xAxis = [];
                var group = [];
                var series = [];
                var markPoint = {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                };
                var markLine = {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                };
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < xAxis.length && xAxis[j] != data[i].name; j++);
                    if (j == xAxis.length)
                        xAxis.push(data[i].name);
                    for (var k = 0; k < group.length && group[k] != data[i].group; k++);
                    if (k == group.length)
                        group.push(data[i].group);
                }
                for (var i = 0; i < group.length; i++) {
                    var temp = [];
                    for (var j = 0; j < data.length; j++) {
                        if (group[i] == data[j].group) {
                            if (type == "map")
                                temp.push({ name: data[j].name, value: data[i].value });
                            else
                                temp.push(data[j].value);
                        }
                    }
                    switch (type) {
                        case 'bar':
                            var series_temp = { name: group[i], data: temp, type: chart_type };
                            if (is_stack)
                                series_temp = $.extend({}, { stack: 'stack' }, series_temp);
                            break;
                        case 'map':
                            var series_temp = {
                                name: group[i], type: chart_type, mapType: 'china', selectedMode: 'single',
                                itemStyle: {
                                    normal: { label: { show: true } },
                                    emphasis: { label: { show: true } }
                                },
                                data: temp
                            };
                            break;
                        case 'line':
                            var series_temp = { name: group[i], data: temp, type: chart_type, markPoint: markPoint, markLine: markLine };

                            if (is_stack)
                                series_temp = $.extend({}, { stack: 'stack' }, series_temp);
                            break;
                        default:
                            var series_temp = { name: group[i], data: temp, type: chart_type };

                    }

                    series.push(series_temp);

                }
                return { category: group, xAxis: xAxis, series: series };
            }
        },
        ChartOptionTemplates: {
            CommonOption: {//通用的图表基本配置
                tooltip: {
                    trigger: 'axis'//tooltip触发方式:axis以X轴线触发,item以每一个数据项触发
                },
                toolbox: {
                    show: true, //是否显示工具栏
                    feature: {
                        mark: true,
                        dataView: { readOnly: false }, //数据预览
                        restore: true, //复原
                        saveAsImage: true //是否保存图片
                    }
                }
            },

            CommonLineOption: {//通用的折线图表的基本配置
                tooltip: {
                    trigger: 'axis',
                    showDelay: 0,
                    hideDelay: 50,
                    transitionDuration: 0,
                    backgroundColor: 'rgba(188,143,143,0.7)',
                    borderColor: '#802A2A',
                    borderRadius: 8,
                    borderWidth: 2,
                    padding: 10


                },
                toolbox: {
                    show: true,

                    feature: {
                        dataView: { show: true, readOnly: false }, //数据预览
                        restore: { show: true }, //复原
                        saveAsImage: { show: true }, //是否保存图片
                        magicType: { show: true, type: ['line', 'bar'] }//支持柱形图和折线图的切换
                    }
                }
            },

            Pie: function (data, name) {//data:数据格式：{name：xxx,value:xxx}...
                var pie_datas = ECharts.ChartDataFormate.FormateNOGroupData(data);
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c} ({d}/%)',
                        show: true
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: pie_datas.category
                    },
                    series: [{
                        name: name || "",
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        data: pie_datas.data
                    }
                    ]
                };
                return $.extend({}, ECharts.ChartOptionTemplates.CommonOption, option);

            },

            Lines: function (data, name, is_stack) { //data:数据格式：{name：xxx,group:xxx,value:xxx}...
                var stackline_datas = ECharts.ChartDataFormate.FormateGroupData(data, 'line', is_stack);
                var option = {
                    title:
                        {
                            text: '',
                            subtext: ''
                        },
                    legend: {
                        show: true,
                        //orient: 'vertical',
                        //x: 'left',
                        y: 'top',
                        data: stackline_datas.category
                    },
                    xAxis: [{
                        type: 'category', //X轴均为category，Y轴均为value
                        data: stackline_datas.xAxis,
                        boundaryGap: false//数值轴两端的空白策略
                    }],
                    yAxis: [{
                        name: name || '',
                        type: 'value',
                        splitArea: { show: true },
                        splitNumber: 2

                    }],
                    grid: { x: 40, y2: 30, x2: 50 },
                    series: stackline_datas.series
                };
                return $.extend({}, ECharts.ChartOptionTemplates.CommonLineOption, option);
            },


            Bars: function (data, name, is_stack) {//data:数据格式：{name：xxx,group:xxx,value:xxx}...
                var bars_dates = ECharts.ChartDataFormate.FormateGroupData(data, 'bar', is_stack);
                var option = {
                    legend: {
                        data: bars_dates.category,
                        y: 'bottom'
                    },

                    title: {
                        text: '折线图',
                        subtext: '折线图'
                    },
                    xAxis: [{
                        type: 'category',
                        data: bars_dates.xAxis,
                        axisLabel: {
                            show: true,
                            interval: 'auto',
                            rotate: 0,
                            margion: 8
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        name: name || '',
                        splitArea: { show: true }
                    }],
                    series: bars_dates.series
                };
                return $.extend({}, ECharts.ChartOptionTemplates.CommonLineOption, option);
            }
        },
        Charts: {
            RenderChart: function (option) {
                require([
                                        'echarts',
                                        'themes',
                                        'echarts/chart/line',
                                        'echarts/chart/bar',
                                        'echarts/chart/pie'
                                        //'echarts/chart/k',
                                        //'echarts/chart/scatter',
                                        //'echarts/chart/radar',
                                        //'echarts/chart/chord',
                                        //'echarts/chart/force',
                                        //'echarts/chart/map'
                ],
                  function (ec, th) {
                      echarts = ec;
                      if (option.chart && option.chart.dispose)
                          option.chart.dispose();
                      option.chart = echarts.init(option.container, th);
                      window.onresize = option.chart.resize;
                      option.chart.setOption(option.option, true);
                      //return option.chart;

                  });

            }
        }
    }