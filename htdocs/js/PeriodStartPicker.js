Bio.PeriodStartPicker = function() {
    this.datePicker = null;
};

Bio.PeriodStartPicker.prototype = {
    init : function(biorhytmsPanel) {
        var that = this;
        
        this.datePicker = Calendar.setup({
            inputField : "periodstart-datepicker",
            trigger : "period-start-picker-trigger",
            align : 'Br/B/l/T/r',
            dateFormat : '%Y-%m-%d',
            onSelect : function() {
                var dateString = this.selection.get() + '';
                biorhytmsPanel.setPeriodStart(moment(dateString, 'YYYYMMDD')); // // See JSCal2 inner format
                this.hide();
            }
        });
        /*
        $(document).on('vmousedown', '#period-start-picker-trigger', function(event) {
            that.datePicker.popup('period-start-picker-trigger');
        });
        */
    }
};