Bio.DateOfBirth = function() {
    
};

Bio.DateOfBirth.prototype = {
    init : function(biorhytmsPanel) {
        $('#birthdate-datepicker').date({
            inline : false,
            dateFormat : 'yy-mm-dd',
            changeMonth : true,
            changeYear : true,
            showOtherMonths : true,
            selectOtherMonths : false,
            onSelect: function(dateString) {
                biorhytmsPanel.setBirthDate(dateString);
            }
        });
        
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