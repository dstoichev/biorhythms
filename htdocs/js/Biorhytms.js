Bio.Biorhytms = function() {
    this.birthDay = '';
    
    this.biorhytmsChart = new Bio.Chart();
};

Bio.Biorhytms.prototype = {
    calculateSeries : function() {
        var now = moment(),
            birthDay = moment(this.birthDay),
            currentDiffInDays = now.diff(birthDay, 'days'),
            physical = [],
            emotional = [],
            intellectual = [],
            currentDay = now.clone(),
            currentDayAsString = currentDay.format('YYYY-MM-DD');
            
        for (var i = 1; i < 26; i++) {
            physical.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 23)]);
            emotional.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 28)]);
            intellectual.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 33)]);
            
            currentDiffInDays++;
            currentDay.add(1, 'day');
            currentDayAsString = currentDay.format('YYYY-MM-DD')
        }
        
        var series = [
            {
                config : {},
                data : physical
            }, {
                config : {},
                data : emotional
            }, {
                config : {},
                data : intellectual
            }                        
        ];
        
        this.biorhytmsChart.addSeries(series);
    },
    
    hasBirthDateSet : function() {
        return this.birthDay !== '';
    },
    
    setBirthDate : function(dateString) {
        this.birthDay = dateString;
    }
};
