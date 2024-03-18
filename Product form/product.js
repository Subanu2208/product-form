function submitForm(){
    var ProductName = document.getElementById("ProductName").value;
    var Quantity = document.getElementById("Quantity").value;
    var SellingPrice = document.getElementById("SellingPrice").value;
    var PurchasingPrice = document.getElementById("PurchasingPrice").value;
    var Description = document.getElementById("Description").value;
    var Total = document.getElementById("Total").value;
    var id = document.getElementById("id").value;

    if(ProductName=="") {
        document.getElementById("ProductName_err").innerHTML="Required";
      } else{
        document.getElementById("ProductName_err").innerHTML="";
      }
      if(Quantity=="") {
        document.getElementById("Quantity_err").innerHTML="Required";
      } else{
        document.getElementById("Quantity_err").innerHTML="";
      }
      if(SellingPrice=="") {
        document.getElementById("SellingPrice_err").innerHTML="Required";
      } else{
        document.getElementById("SellingPrice_err").innerHTML="";
      }
      if(PurchasingPrice=="") {
        document.getElementById("PurchasingPrice_err").innerHTML="Required";
      } else{
        document.getElementById("PurchasingPrice_err").innerHTML="";
      }
      if(Description=="") {
        document.getElementById("Description_err").innerHTML="Required";
      } else{
        document.getElementById("Description_err").innerHTML="";
      }
      if(Total=="") {
        document.getElementById("Total_err").innerHTML="Required";
      } else{
        document.getElementById("Total_err").innerHTML="";
      }
      
      if(parseInt(PurchasingPrice) < parseInt(SellingPrice)){

      if(
        ProductName!=null && Quantity!=null && SellingPrice!=null && PurchasingPrice!=null && Description!=null && Total!=null
      ){
      let obj={
        productName : ProductName,
        Quantity : Quantity,
        sellingPrice : SellingPrice,
        purchasingPrice : PurchasingPrice,
        Description : Description,
        Total : Total
      };
      //put
      if(id!=null && id!=""){
        obj["id"] = id;
        putData(obj)
      }else{
      postData(obj)
    }  
    document.getElementById("myform").reset();
 
  }
}else{
    alert("Please enter the valid amount")
  }
}
  function table(data){
    var k = "";
    
      for (i = 0; i < data.length; i++) {
        k += "<tr>";
        k += "<td>" + data[i].productName + "</td>";
        k += "<td>" + data[i].Quantity + "</td>";
        k += "<td>" + data[i].sellingPrice+ "</td>";
        k += "<td>" + data[i].purchasingPrice + "</td>";
        k += "<td>" + data[i].Description + "</td>";
        k += "<td>" + data[i].Total + "</td>";
        
        k +=
          '<td><button class="btn btn-primary" style="" onclick="Edit(' +
          data[i].id  +
           ')">Edit</button> <button class="btn btn-danger"  onclick="Delete(' +
           data[i].id  +
           ')">Delete</button></td>';
      }
      document.getElementById("displayArea").innerHTML = k;
    }
  
function  postData(obj){
    let url="https://656e9de46529ec1c62366493.mockapi.io/product";
    
fetch(url,{
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    })
    .then((Result) => Result.json())
      .then((string) => {
        console.log(string);
        getAll()

      })
      .catch((errorMsg) => {
        console.log(errorMsg);
      });

  }
  function getAll(){
    let url="https://656e9de46529ec1c62366493.mockapi.io/product";
    
    fetch(url,{
      method : "GET",
      headers : { "Content-Type": "application/json" }    })
    .then((Result) => Result.json())
      .then((string) => {

        console.log(string);
        table(string);
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
      });
  }

  //GET by id
  function Edit(id){
    let url="https://656e9de46529ec1c62366493.mockapi.io/product/" +id ;

    fetch(url,{
      method : "GET",
      headers : { "Content-Type": "application/json" }   
     })
    .then((Result) => Result.json())
      .then((string) => {
        document.getElementById("ProductName").value = string.productName;
        document.getElementById("Quantity").value = string.Quantity;
        document.getElementById("SellingPrice").value = string.sellingPrice;
        document.getElementById("PurchasingPrice").value = string.purchasingPrice;
        document.getElementById("Description").value = string.Description;
        document.getElementById("Total").value = string.Total;
        document.getElementById("id").value = id;
        console.log(string);
        getAll();
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
      });
  }
  //put
  function  putData(obj){
    let url="https://656e9de46529ec1c62366493.mockapi.io/product/" +obj.id;
    
fetch(url,{
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    })
    .then((Result) => Result.json())
      .then((string) => {
        console.log(string);
        getAll()

      })
      .catch((errorMsg) => {
        console.log(errorMsg);
      });

  }
  function Delete(id){
    let url="https://656e9de46529ec1c62366493.mockapi.io/product/" +id ;

    fetch(url,{
      method : "DELETE",
      headers : { "Content-Type": "application/json" }   
     })
    .then((Result) => Result.json())
      .then((string) => {
      //window.location.reload();
       getAll();
        console.log(string);
        table(string);
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
      });
  }

  document.addEventListener("DOMContentLoaded", function() {
    var numericInput = document.getElementById("Quantity");
    var SellingPrice = document.getElementById("SellingPrice");
    var PurchasingPrice = document.getElementById("PurchasingPrice");
    // Add event listener for input
    numericInput.addEventListener("input", function () {
        // Remove non-numeric characters using regular expression
        numericInput.value = numericInput.value.replace(/[^0-9]/g, '');
    });
    SellingPrice.addEventListener("input", function () {
      // Remove non-numeric characters using regular expression
      SellingPrice.value = SellingPrice.value.replace(/[^0-9]/g, '');
  });
  PurchasingPrice.addEventListener("input", function () {
    // Remove non-numeric characters using regular expression
    PurchasingPrice.value = PurchasingPrice.value.replace(/[^0-9]/g, '');
});
});

function calTotal(){
  var Quantity =document.getElementById("Quantity").value;
  var SellingPrice=document.getElementById("SellingPrice").value;
 // if(SellingPrice!=null && SellingPrice!=""){
   // validPus();
    
  //}
  var subTotal=0;
  subTotal=Quantity*SellingPrice;
  document.getElementById("Total").value=subTotal.toFixed(2);
}
 