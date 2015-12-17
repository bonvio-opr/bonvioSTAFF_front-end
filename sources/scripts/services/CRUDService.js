app.service('CRUDService', function () {
    var self = this;

    self.init = function (type, Factory) {
        var vm = {};

        vm.isList = true;

        Factory.query(function (results) {
            vm[type + 's'] = results;
        }).$promise.catch(function (response) {
                jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
            });

        vm.prepare = function (result) {
            vm.modalTitle = result ? 'Update' : 'Create';
            vm.control = result ? 'update' : 'create';
            vm[type] = angular.copy(result) || {};
            vm.isList = false;
            vm.index = vm[type + 's'].indexOf(result);
        };

        vm.create = function () {
            Factory.save({}, vm[type], function (data) {
                vm[type].id = data.id;
                vm[type + 's'].push(vm[type]);
                vm.prepare(vm[type]);
            }).$promise.catch(function (response) {
                    jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
                });
        };

        vm.update = function () {
            Factory.update({}, vm[type], function (data) {
                vm[type].id = data.id;
                vm[type + 's'][vm.index] = angular.copy(vm[type]);
            }).$promise.catch(function (response) {
                    jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
                });
        };

        vm.remove = function () {
            Factory.remove({id: vm[type].id}, function () {
                vm[type + 's'].splice(vm.index, 1);
                vm[type] = undefined;
            }).$promise.catch(function (response) {
                    jQuery('#error.modal').modal('show').find('.modal-body').html(response.data);
                });
        };

        return vm;
    }
});