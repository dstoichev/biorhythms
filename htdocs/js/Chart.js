Bio.Chart = function() {
    this.birthDay = '1971-06-25';
    this.chart = null;
    this.chartOptions = {
        // Turns on animation for all series in this plot.
        animate : true,
        axesDefaults : {						
            pad : 0,       // a factor multiplied by the data range on the axis to give the
                            // axis range so that data points don't fall on the edges of the axis.
            tickOptions : {
                showMark : false     // whether or not to show the mark on the axis							
            }
        },
        
        axes : {
            xaxis : {
                show : true,                                
                drawMajorGridlines : false,
                renderer : $.jqplot.DateAxisRenderer,
                tickRenderer : $.jqplot.CanvasAxisTickRenderer,
                tickOptions : {
                    showMark : true,
                    markSize : 10,
                    labelPosition : 'middle',
                    angle : -45
                }
            },
            
            yaxis : {
                pad : 1.1,
                drawMajorGridlines : true
            }
        },
        
        seriesDefaults : {
            shadow : false			
        },
        
        grid : {
            background : '#fff',      // CSS color spec for background color of grid.
            borderWidth : 0,           // pixel width of border around grid.
            shadow : false               // draw a shadow for grid.						
        },
        
        highlighter : {
            show : true,
            sizeAdjust : 3,          // pixels to add to the size of filled markers when drawing highlight.
            showTooltip : true,      // show a tooltip with data point values.
            tooltipLocation : 'nw',  // location of tooltip : n, ne, e, se, s, sw, w, nw.
            fadeTooltip : true,      // use fade effect to show/hide tooltip.
            tooltipFadeSpeed : 'def', // slow, def, fast, or a number of milliseconds.
            tooltipOffset : 2,       // pixel offset of tooltip from the highlight.
            tooltipAxes : 'y',        // which axis values to display in the tooltip, x, y or both.
            useAxesFormatters : false, // use the same format string and formatters as used in the axes to
                                    // display values in the tooltip.
            tooltipFormatString : '&nbsp;%.3f &nbsp;' // sprintf format string for the tooltip.  only used if
                                        // useAxesFormatters is false.  Will use sprintf formatter with
                                        // this string, not the axes formatters.

        }
    };
    
    this.series = [];
    this.seriesData = [];
};

Bio.Chart.prototype = {
    addSeries : function(series) {
        var data = new Array(),
            configs = new Array(),
            serieObjects = new Array(),
            serieObject;
        
        for (var i = 0; i < series.length; i++) {
            var serie = series[i];
            
            serieObject = new Bio.Chart.LineSerie(serie);
        
            configs.push(serieObject.config);
            data.push(serieObject.data);			
            serieObjects.push(serieObject);			
        }
    
        // Prepare to show in chart
        if (this.chart) {            
            if (! this.hasChanges(serieObjects)) {
                return;
            }
        }
    
        this.series = serieObjects;	
        this.seriesData = data;
        this.chartOptions.series = configs;		
        this.refreshChart();
    },
    
    calculateSeries : function() {
        var now = moment(),
            birthDay = moment(this.birthDay),
            currentDiffInDays = now.diff(birthDay, 'days'),
            physical = [],
            emotional = [],
            intellectual = [],
            currentDay = birthDay.clone(),
            currentDayAsString = currentDay.format('YYYY-MM-DD');
            
        for (var i = 1; i < 26; i++) {
            physical.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 23)]);
            emotional.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 28)]);
            intellectual.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 33)]);
            
            currentDiffInDays++;
            currentDay.add(1, 'day');
            currentDayAsString = currentDay.format('YYYY-MM-DD')
        }
        
        this.addSeries([physical, emotional, intellectual]);
    },
    
    refreshChart : function() {
        if (this.chart) {
            this.chart.destroy();
            $('chart1').html('');
        }
		
		this.chart = $.jqplot('chart1', this.seriesData, this.chartOptions);	
    },
    
    setBirthDate : function(dateString) {
        this.birthDay = dateString;
    },
    
    setVisibleSerie: function(index, visible) {
		if (this.series.length && visible != this.series[index].visible) {
			this.series[index].visible = visible;
			this.chartOptions.series[index].show = visible;
			this.refreshChart();
		}
	},
	
	areConfigsTheSame: function(conf1, conf2) {
		var configKeysForCheckEqual = ['label', 'show', 'color'],
			extraConfigKeys = ['lineWidth', 'markerOptions'],
			keys = configKeysForCheckEqual.concat(extraConfigKeys);
			
		for (var i = 0; i < keys.length; i++) {
			var prop = keys[i];
			if ((conf1.hasOwnProperty(prop) && !conf2.hasOwnProperty(prop)) ||
				(conf2.hasOwnProperty(prop) && !conf1.hasOwnProperty(prop)) ||
				(-1 != configKeysForCheckEqual.indexOf(prop) && conf1[prop] !== conf2[prop])) {
				return false;
			}
		}
		return true;
	},
	
	hasChanges: function(newSeries) {
		if (newSeries.length != this.series.length) {
			return true;
		}
		
		var len = newSeries.length;		    
		for (var i = 0; i < len; i++) {
			if (newSeries[i].visible != this.series[i].visible) {
				return true;
			}
			if (newSeries[i].data.length != this.series[i].data.length) {
				return true;
			}
			for (var j = 0; j < newSeries[i].data.length; j++) {
				var toString1 = newSeries[i].data[j].toString(),
				    toString2= this.series[i].data[j].toString();
				if (toString2 !== toString1) {
					return true;
				}
			}
			if (! this.areConfigsTheSame(newSeries[i].config, this.series[i].config)) {
				return true;
			}
		}		
		return false;
	}
};

Bio.Chart.LineSerie = function(config) {
    this.config = null;
    this.data = [];
    
    $.extend(this, config);
};