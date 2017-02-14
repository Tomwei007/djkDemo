//定义了一些通用的echarts的图标创建方法。定义统一的option

//[{ ID:'',Charts:[]}[
var charts = [];
require.config({
    paths: {
        echarts: URL('/Scripts/echarts-2.2.0/dist')
    }
});

//默认设置
var myChart = {
    defaultXAxisLabel: {},
    defaultGrid: {},
    autoAxisMaxAndMin: true,
    defaultMarkLine: {
        data: [
            { type: 'average', name: '平均值' }
        ]
    },
    defaultMarkPoint: {
        data: [
            //{ type: 'max', name: '最大值' },
            //{ type: 'min', name: '最小值' }
        ]
    },
    defaultTitleStyle: {
        fontSize: 12,
        fontWeight: 'bolder'
    },
    defaultPieoption: {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: false },
                dataView: { show: false, readOnly: false },
                magicType: {
                    show: false,
                    type: ['pie']
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
    },
    lineOrBarDefaultOption: {
        tooltip: {
            trigger: 'axis'
        },
        calculable: false,
        toolbox: {
            show: true,
            feature: {
                mark: { show: false },
                dataView: { show: false },
                magicType: {
                    show: true, type: ['line', 'bar']
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        }
    },
    Reset: function () {
        myChart.autoAxisMaxAndMin = true;
        myChart.defaultGrid = {};
        myChart.defaultXAxisLabel = {};
        myChart.defaultMarkLine = {
            data: [
                { type: 'average', name: '平均值' }
            ]
        };
        myChart.defaultMarkPoint = {
            data: [
                //{ type: 'max', name: '最大值' },
                //{ type: 'min', name: '最小值' }
            ]
        };
        myChart.defaultTitleStyle = {
            fontSize: 12,
            fontWeight: 'bolder'
        };
        myChart.defaultPieoption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: false },
                    dataView: { show: false, readOnly: false },
                    magicType: {
                        show: false,
                        type: ['pie']
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
        };
        myChart.lineOrBarDefaultOption = {
            tooltip: {
                trigger: 'axis'
            },
            calculable: false,
            toolbox: {
                show: true,
                feature: {
                    mark: { show: false },
                    dataView: { show: false },
                    magicType: {
                        show: true, type: ['line', 'bar']
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            }
        }
    }

}



//CreatLine函数参数格式说明
//panelId:''

//title: {
//        text: '未来一周气温变化',
//        subtext: '纯属虚构'
//}
//category:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
//datas:[{name:'最高气温',data:[{Name:'',Value:''}]}]
//option:和echarts的option一样
var echartsFun = {
    CreatHBar: function (panelId, title, datas, option, callback) {
        createBarOrLine(panelId, title, datas, option, { type: 'bar', isH: true }, callback);
    },
    CreatVBar: function (panelId, title, datas, option, callback) {
        createBarOrLine(panelId, title, datas, option, { type: 'bar', isH: false }, callback);
    },
    CreatLine: function (panelId, title, datas, option, callback) {
        createBarOrLine(panelId, title, datas, option, { type: 'line' }, callback);
    },
    CreatPie: function (panelId, title, datas, option, callback) {
        createPie(panelId, title, datas, option, callback);
    }
}


//isH:是否水平显示柱状图
//type: { type:'line'}or{ type:'bar',isH:true}
function createBarOrLine(panelId, title, datas, option, type, callback) {
    //根据参数合并一个新的option
    var series = [];
    var legend = [];
    var category = [];
    $.each(datas, function (i, n) {
        category = [];
        var values = [];
        $.each(n.data, function (index, item) {
            category.push(item.Name);
            values.push(item.Value);
        });


        legend.push(n.name);
        series.push({
            name: n.name,
            data: values,
            type: type.type,
            barCategoryGap: '20%',
            barGap: '0%',
            markPoint: myChart.defaultMarkPoint,
            markLine: myChart.defaultMarkLine
        });
    });
    var min = 0, max = 0;
    if (myChart.autoAxisMaxAndMin) {
        $.each(datas, function (i, n) {
            $.each(n.data, function (j, d) {
                if (max < d.Value) {
                    max = d.Value;
                }
                if (min == 0 || min > d.Value) {
                    min = d.Value;
                }
            })
        });
        min = parseInt(min * 0.9);
        max = parseInt(max * 1.1);
    }

    var yAxis = [], xAxis = [];
    if (type.type == 'line') {
        xAxis = [{
            type: 'category',
            boundaryGap: false,
            data: category,
            axisLabel: myChart.defaultXAxisLabel
        }];

        yAxis = [{
            type: 'value'
        }];
        if (myChart.autoAxisMaxAndMin) {
            yAxis[0].scale = true;
            yAxis[0].max = max;
            yAxis[0].min = min;
        }
    }
    else if ((type.type == 'bar' && type.isH == false)) {
        yAxis = [{
            type: 'category',
            boundaryGap: true,
            data: category
        }];

        xAxis = [{
            type: 'value',
            axisLabel: myChart.defaultXAxisLabel
        }];
        if (myChart.autoAxisMaxAndMin) {
            xAxis[0].scale = true;
            xAxis[0].max = max;
            xAxis[0].min = min;
        }
    }
    else {
        xAxis = [{
            type: 'category',
            boundaryGap: true,
            data: category,
            axisLabel: myChart.defaultXAxisLabel
        }];

        yAxis = [{
            type: 'value'
        }];
        if (myChart.autoAxisMaxAndMin) {
            yAxis[0].scale = true;
            yAxis[0].max = max;
            yAxis[0].min = min;
        }
    }

    title.textStyle = myChart.defaultTitleStyle;
    var newOption = $.extend({ grid: myChart.defaultGrid, title: title, legend: { data: legend }, xAxis: xAxis, yAxis: yAxis, series: series },
myChart.lineOrBarDefaultOption, option);
    require(
            [
                'echarts',
                URL('/Scripts/echarts-2.2.0/theme/macarons'),
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
             function (ec, th) {
                 var chart = ec.init(document.getElementById(panelId), th);
                 chart.setOption(newOption);

                 if (callback != null) {
                     callback(chart);
                 }

                 //setListen(listenPanel, chart);
                 ////目前使用的easyui大小改变事件。普通的需要引用jquery.resize.js。$('#div').onResize=function(){}
                 //$('#' + listenPanel).panel({
                 //    onResize: function (w, h) {
                 //        if (callback != null) {
                 //            callback(w, h);
                 //        }
                 //        resizeChart(listenPanel);
                 //    }
                 //});
             }
            );
}
//datas:[{name:'最高气温',data:[{Name:'',Value:''}]}]
//isW=true水平表格
function CreateTable(dataGridId, unit, isW, datas, callback) {
    var html = '<table class="dataTable" style="width: 100%;" cellpadding="0" cellspacing="0">';
    var headHtml = '';//存放分类的html,井口1</td><td>井口2</td>



    if (isW == true) {
        var dataHtml = '';//存放数据的html,<td>实际</td><td>1</td><td>2</td>
        $.each(datas, function (i, n) {
            headHtml = '';
            dataHtml = dataHtml + '<tr><td class="unit">' + n.name + '\\' + unit + '</td>';
            $.each(n.data, function (i, n) {
                dataHtml = dataHtml + '<td>' + n.Value + '</td>';
                headHtml = headHtml + '<td  class="unit">' + n.Name + '</td>';
            });
            dataHtml = dataHtml + '</tr>';
        })
        html = html + '<tr><td class="unit">单位</td>' + headHtml + '</tr>' + dataHtml + '</table>';

    }
    else {
        var dataHtml = [];
        $.each(datas, function (k, n) {
            headHtml = headHtml + '<td class="unit">' + n.name + '\\' + unit + '</td>';

            for (var i = 0; i < n.data.length; i++) {
                if (k == 0) {
                    dataHtml.push('<tr><td  class="unit">' + n.data[i].Name + '</td><td>' + n.data[i].Value + '</td>');
                }
                else {
                    dataHtml[i] = dataHtml[i] + '<td>' + n.data[i].Value + '</td>';
                }
            };
        });
        html = html + '<tr><td class="unit">单位</td>' + headHtml + '</tr>';
        $.each(dataHtml, function (i, n) {
            html = html + n + '</tr>';
        })
    }

    $('#' + dataGridId).empty()
    $('#' + dataGridId).append(html);
    if (callback != null) {
        callback();
    }

    return html;
}

function createPie(panelId, title, datas, option, callback) {
    //根据参数合并一个新的option
    var series = [];
    var legend = [];
    var category = [];

    $.each(datas, function (i, n) {
        category = [];
        var values = [];
        $.each(n.data, function (index, item) {
            category.push(item.Name);
            values.push({ name: item.Name, value: item.Value });
        });
        series.push({
            type: 'pie',
            radius: '55%',
            center: ['50%', '45%'],
            name: n.name,
            data: values
        });
    });

    title.textStyle = myChart.defaultTitleStyle;
    var newOption = $.extend(myChart.defaultPieoption, {
        title: title, legend: {
            orient: 'horizontal', y: 'bottom', x: 'left', data:
        category
        }, series: series
    }, option);
    require(
        [
            'echarts',
            URL('/Scripts/echarts-2.2.0/theme/macarons'),
            'echarts/chart/pie'
        ],
         function (ec, th) {
             var chart = ec.init(document.getElementById(panelId), th);
             chart.setOption(newOption);
             if (callback != null) {
                 callback(chart);
             }

             //setListen(listenPanel, chart);
             //目前使用的easyui大小改变事件。普通的需要引用jquery.resize.js。$('#div').onResize=function(){}
             //$('#' + listenPanel).panel({
             //    onResize: function () {
             //        if (callback != null) {
             //            callback();
             //        }
             //        resizeChart(listenPanel);
             //    }
             //});
         }
        );
}

function setListen(id, chart) {
    var chartItem = charts.filter(function (n) {
        if (n.ID == id)
            return n;
    });
    if (chartItem != null && chartItem.length == 1) {
        chartItem[0].Charts.push(chart);
    }
    else {
        charts.push({ ID: id, Charts: [chart] });
    }
}

function resizeChart(id) {
    var chartItem = charts.filter(function (n) {
        if (n.ID == id)
            return n;
    });
    if (chartItem != null && chartItem.length == 1) {
        $.each(chartItem[0].Charts, function (i, n) {
            n.resize();
        })
    }
}
