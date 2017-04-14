angular.module('orderCloud')
    .controller('UserGroupCtrl', UserGroupController)
;

function UserGroupController($state, $stateParams, toastr, OrderCloudSDK, ocUserGroups, SelectedUserGroup) {
    var vm = this;
    vm.group = SelectedUserGroup;
    vm.model = angular.copy(SelectedUserGroup);

    vm.update = function() {
        OrderCloudSDK.UserGroups.Update($stateParams.buyerid, vm.group.ID, vm.model)
            .then(function(updatedUserGroup) {
                if (updatedUserGroup.ID != vm.group.ID) $state.go('.', {usergroupid:updatedUserGroup.ID}, {notify:false});
                vm.group = updatedUserGroup;
                vm.model = angular.copy(updatedUserGroup);
                SelectedUserGroup = angular.copy(updatedUserGroup);
                toastr.success(vm.group.Name + ' was updated.');
            });
    };

    vm.delete = function() {
        ocUserGroups.Delete(vm.group, $stateParams.buyerid)
            .then(function() {
                toastr.success(vm.group.Name + ' was deleted.');
                $state.go('userGroups');
            });
    };
}