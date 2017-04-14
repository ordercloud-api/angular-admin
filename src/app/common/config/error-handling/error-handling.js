angular.module('orderCloud')
    .config(function($qProvider, $provide) {
        //Error Handling
        $provide.value('ocErrorMessages', {
            customPassword: 'Password must be at least eight characters long and include at least one letter and one number',
            positiveInteger: 'Please enter a positive integer',
            ID_Name: 'Only Alphanumeric characters, hyphens and underscores are allowed',
            confirmpassword: 'Your passwords do not match',
            noSpecialChars: 'Only Alphanumeric characters are allowed',
            'UnavailableID': 'This ID is already in use.',
            'User.UsernameMustBeUnique': 'This username is already in use.',
            'step': 'Please enter a valid dollar amount.',
            'priceBreakRequired': 'At least one price break is required.',
            'priceBreakExceedsMaxQuantity': 'Must be less than the maximum quantity.',
            'priceBreakQuantityConflict': 'This quantity already has a price.',
            'priceBreakStartingQuantity': 'First price break must equal the minimum quantity.',
            'priceBreakOtherQuantity': 'Must be greater than the minimum quantity.'
        });

        $provide.decorator('$exceptionHandler', handler);
        $qProvider.errorOnUnhandledRejections(false); //Stop .catch validation from angular v1.6.0
        function handler($delegate, $injector) { //Catch all for unhandled errors
            return function(ex, cause) {
                //TODO: this was changed to include the below if statement on 2/7/2017 - this change could cause unknown issues
                if (ex) {
                    $delegate(ex, cause);
                    var message = (ex.response && ex.response.body && ex.response.body.Errors && ex.response.body.Errors.length) ? 
                        ex.response.body.Errors[0].Message : 
                        ex.message;

                    $injector.get('toastr').error(message, 'Error');
                }
            };
        }
    })
;

