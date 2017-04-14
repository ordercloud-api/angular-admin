angular.module('orderCloud')
    .config(ProductShippingConfig)
;

function ProductShippingConfig($stateProvider) {
    $stateProvider
        .state('product.shipping', {
            url: '/shipping',
            templateUrl: 'productManagement/shipping/templates/productShipping.html',
            controller: 'ProductShippingCtrl',
            controllerAs: 'productShipping',
            data: {
                pageTitle: 'Product Shipping'
            }
        })
    ;
}