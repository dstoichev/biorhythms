Bio.DateOfBirth = function() {
    this.datePicker = null;
};

Bio.DateOfBirth.prototype = {
    init : function(biorhytmsPanel) {
        var that = this;
        
        this.datePicker = Calendar.setup({
            inputField : "birthdate-datepicker",
            trigger : "birthdate-datepicker",
            align : 'Br/B/l/T/r',
            dateFormat : '%Y-%m-%d',
            onSelect : function() {
                var dateString = this.selection.get() + '';
                biorhytmsPanel.setBirthDate(moment(dateString, 'YYYYMMDD')); // See JSCal2 inner format
                this.hide();
            }
        });
        /*
        $(document).on('vmousedown', '#birthdate-datepicker', function(event) {
            that.datePicker.popup(event.target);
        });
        */
        $(document).on('vmousedown', '#to-chart-anchor', function(event) {
            if (! biorhytmsPanel.hasBirthDateSet()) {
                Bio.warn('Birthdate is required');
                event.preventDefault();
                return false;
            }
            
            $('biorhytms-chart').page('show');
        });
    }
};