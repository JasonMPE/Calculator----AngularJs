/*###############################################################################
Author: Jason Wang
Date: Nov 11th, 2015
Version: 1.0
Functionality: Simple Calulator
    1. Implementation of basic arithmatic (plus/mius/mutiply/division)
    2. By now just can be operated between two operands
Bugs:
	1. Precision Problem
	2. Some kind of things I have not realized
Future work:
	1. Implement the operation of multiple operands
	2. Add more operator to do more complicated arithmatic
################################################################################*/


var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope){
	$scope.nums = [7,8,9,4,5,6,1,2,3,0,'00','.'];
	$scope.operator = ['±','C','-','x'];
	$scope.plus = '+';
	$scope.division = '÷';
	$scope.equal = '=';
	$scope.operatorStatus = {
		equal: false,
		minus: false,
		multiply: false,
		plus: false,
		division: false
	};

	$scope.ret = 0;
	$scope.operand1 = 0;
	$scope.operand2 = 0;
	$scope.sign = false;
	$scope.dot = false;
	$scope.dotNum = 1;

	$scope.getNum = function(x){

		// Record Operand1 and Operand2
		if(x >= 0 && x <= 9 && x !== '00'){
			// Record operand1 
			if(!$scope.sign){
				// Clear the data without using Clear Button
				if($scope.ret !== 0 && $scope.operatorStatus.equal){
					$scope.operatorStatus.equal = false;
					$scope.operand1 = 0;
					$scope.ret = 0;
				}

				//Integer
				if(!$scope.dot){
					$scope.operand1 = $scope.operand1 * 10 + x;
					$scope.ret = $scope.operand1;
				}
				//Float number
				else{
					$scope.operand1 = ($scope.operand1*10 + 10*(x/(Math.pow(10,$scope.dotNum))))/10;
					$scope.dotNum ++;
					$scope.ret = $scope.operand1;
				}
			}

			// Record operand2
			else{
				if(!$scope.dot){
					$scope.operand2 = $scope.operand2 * 10 + x;
					$scope.ret = $scope.operand2;
				}
				else{
					$scope.operand2 = ($scope.operand2*10 + 10*(x/(Math.pow(10,$scope.dotNum))))/10;
					$scope.dotNum ++;
					$scope.ret = $scope.operand2;
				}
			}
		}
		else if(x === '00'){
			if(!$scope.sign){
				if(!$scope.dot){
					$scope.operand1 = $scope.operand1 * 100;
					$scope.ret = $scope.operand1;
				}
				else{
					$scope.dotNum ++;
					$scope.dotNum ++;
					$scope.ret = $scope.operand1;
				}
			}
			else{
				if(!$scope.dot){
					$scope.operand2 = $scope.operand2 * 100;
					$scope.ret = $scope.operand2;
				}
				else{
					$scope.dotNum ++;
					$scope.dotNum ++;
					$scope.ret = $scope.operand2;
				}
			}
		}
		else if(x == '.'){
			$scope.dot = true;
		}
		
	};

	$scope.getOperator = function(x){

		// All Clear
		if(x == 'C'){
			$scope.ret = 0;
			$scope.operand1 = 0;
			$scope.operand2 = 0;
			$scope.sign = false;
			$scope.dot = false;
			$scope.dotNum = 1;
			$scope.operatorStatus.plus = false;
			$scope.operatorStatus.minus = false;
			$scope.operatorStatus.multiply = false;
			$scope.operatorStatus.division = false;
			$scope.operatorStatus.equal = false;
		}
		else if(x == 'plus'){
			$scope.sign = true;
			$scope.dot = false;
			$scope.dotNum = 1;
			$scope.operatorStatus.plus = true;
			$scope.operatorStatus.minus = false;
			$scope.operatorStatus.multiply = false;
			$scope.operatorStatus.division = false;
		}
		else if(x == '-'){
			$scope.sign = true;
			$scope.dot = false;
			$scope.dotNum = 1;
			$scope.operatorStatus.minus = true;
			$scope.operatorStatus.plus = false;
			$scope.operatorStatus.multiply = false;
			$scope.operatorStatus.division = false;
		}
		else if(x == 'x'){
			$scope.sign = true;
			$scope.dot = false;
			$scope.dotNum = 1;
			$scope.operatorStatus.multiply = true;
			$scope.operatorStatus.plus = false;
			$scope.operatorStatus.minus = false;
			$scope.operatorStatus.division = false;
		}
		else if(x == 'division'){
			$scope.sign = true;
			$scope.dot = false;
			$scope.dotNum = 1;
			$scope.operatorStatus.division = true;
			$scope.operatorStatus.plus = false;
			$scope.operatorStatus.minus = false;
			$scope.operatorStatus.multiply = false;
		}
		else if(x == '±'){
			if(!$scope.sign){
				$scope.operand1 = -$scope.operand1;
				$scope.ret = $scope.operand1;
			}
			else{
				$scope.operand2 = -$scope.operand2;
				$scope.ret = $scope.operand2;
			}
				 
		}
		else if(x == 'equal'){
			if($scope.operatorStatus.plus){
				$scope.ret = (10 * $scope.operand1 + 10 * $scope.operand2) / 10;
			}
			else if($scope.operatorStatus.minus){
				$scope.ret = (10 * $scope.operand1 - 10 * $scope.operand2) / 10;
			}
			else if($scope.operatorStatus.multiply){
				$scope.ret =  $scope.operand1 * $scope.operand2;
			}
			else if($scope.operatorStatus.division){
				$scope.ret = $scope.operand1 / $scope.operand2;
			}

			
			$scope.sign = false;
			$scope.dot = false;
			$scope.dotNum = 1;
			$scope.operatorStatus.equal = true;
			$scope.operatorStatus.plus = false;
			$scope.operatorStatus.minus = false;
			$scope.operatorStatus.multiply = false;
			$scope.operatorStatus.division = false;

			$scope.operand1 = $scope.ret;
			$scope.operand2 = 0;

		}
	};

});