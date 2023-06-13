window.ListProductController = function ($scope,$http) {
	
	//tạo đường dẫn apiUrl để call tới API 
	var apiUrl = "http://localhost:3000/products";
	$scope.getData = function(){
		//gọi để lấy data
		$http.get(apiUrl).then(function(response){
			// console.log(response);
			//nếu như responnse trả về thành công 
			if(response.status == 200) {
				// tạo ra 1 biến products để hứng dữ liệu từ
				// phía json-server trả về
				$scope.products = response.data;
			}
		})
	}
	$scope.getData();
	$scope.onDelete = function(deleteID) {
		let confirm = window.confirm("Bạn có muốn xóa không ?");
		// nếu như confirm ok tức là đồng ý xóa
		if(confirm) {
			$http.delete(`${apiUrl}/${deleteID}`).then(
				function(response) {
					if(response.status == 200) {
						//gọi lại hàm getData để cập nhập lại bảng
						$scope.getData();
					}
				}
			)
		}
	}
	
}