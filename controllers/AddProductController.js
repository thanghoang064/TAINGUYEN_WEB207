window.AddProductController = function ($scope,$http,$location) {
    var apiUrl = 'http://localhost:3000/products';
    $scope.onSubmitForm = function() {
        // tạo ra đối tượng item mới để thêm vào 
        var newItem =  {
            ...$scope.inputValue,
        }
        //khi thêm dữ liệu mới thì phải sử dụng phương thức post
        $http.post(
            apiUrl,
            newItem // dữ liệu để thêm vào 
        ).then(function(response){
            // trạng thái của tk thêm mới là 201
            if(response.status == 201) {
                $location.path('list-product')
            }
        })

    }
}