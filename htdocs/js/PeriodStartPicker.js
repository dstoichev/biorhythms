Bio.PeriodStartPicker = function() {
    
};

Bio.PeriodStartPicker.prototype = {
    init : function(biorhytmsPanel) {
        $('#periodstart-datepicker').date({
            inline : false,
            dateFormat : 'yy-mm-dd',
            changeMonth : true,
            changeYear : true,
            showOtherMonths : true,
            selectOtherMonths : false,
            onSelect: function(dateString) {
                biorhytmsPanel.setPeriodStart(dateString);
            }
        });
    },
    
    show : function() {
        setTimeout(function(){$('#periodstart-datepicker').datepicker('show');}, 350);
    }
};