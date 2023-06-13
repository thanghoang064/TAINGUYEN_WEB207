window.EditProductController = function ($scope, $http, $routeParams, $location) {
    var apiUrl = 'http://localhost:3000/products';
    var editId = $routeParams.id;

    $scope.getProductInfo = function() {
        $http.get(`${apiUrl}/${editId}`).then(
            function (response) {
                if (response.status === 200) {
                    $scope.product = response.data;
                    $scope.inputValue = {
                        name: response.data.name,
                        price: response.data.price
                    }
                }
            }
        ).catch(function (error) {
            $scope.message = `${error.statusText} product with id ${editId}`;
        });
    }

    $scope.getProductInfo();

    //kiem tra du lieu co hop le hay khong,
    $scope.kiemTraDuLieu = {
        name: false, // ko loi thi mac dinh la false
        price: false,
    }

    $scope.onEditForm = function() {
        // gán 1 biến để kiểm tra lỗi, nếu 1 trong 2 trường lỗi thì update thành true
        let flag = false;
        if(!$scope.inputValue || !$scope.inputValue.name) { //nếu không có inputValue hoặc không có name {
            $scope.kiemTraDuLieu.name = true;
            flag = true;   
        }
        if(!$scope.inputValue || !$scope.inputValue.price) { //nếu không có inputValue hoặc không có price {
            $scope.kiemTraDuLieu.price = true;
            flag = true;   
        }

        if (!flag) { // nếu flag = false, tức là không có lỗi thì chạy api edit
            var updateItem = {
                ...$scope.inputValue,
            }

            $http.put(
                `${apiUrl}/${editId}`, //API Url
                updateItem // dữ liệu update
                ).then(
                function (response) {
                    if (response.status === 200) {
                        $location.path('list-product');
                    }
                }
            )
        }
    }
}