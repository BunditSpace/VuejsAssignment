<template>
     <div>
    <hr/>
    <h2 class="alert-info">Category : {{ category.categoryName }} has {{ productCount }} products </h2>
    <div>
        <h4 style="float: left; padding-right: 20px"> <span class="badge badge-primary"><i class="fa fa-thumbs-up"></i> Like {{ recommendedCount }}</span> </h4>
        <h4 style="float: left; padding-right: 20px"> <span class="badge badge-secondary"><i class="fa fa-thumbs-down"></i> DisLike {{ notrecommendedCount }}</span> </h4>
        <h4> <a class="badge badge-info" data-toggle="collapse" v-bind:href="categoryLinkCollapse" role="button" aria-expanded="false" v-bind:aria-controls="categoryNameCollapse" @click="setState">
             Add product <i v-bind:class="isAddProduct"></i>
        </a>
        </h4>
    </div>
    <div style="clear: both;"></div>

    <div class="row">
    <div class="col">
        <div class="collapse multi-collapse" v-bind:id="categoryNameCollapse">
        <div class="card card-body">
            <form v-bind:id="categoryForm" novalidate="true" v-on:submit.prevent>
            <div class="form-group col-6 col-md-6 col-lg-4">
                <label for="productImage">Product image url</label>
                <input type="text"  v-model="product.imageUrl" class="form-control" id="productImage" placeholder="Enter product image url">
            </div>
            <div class="form-group col-12 col-md-6 col-lg-4">
            <label for="productName">Product name</label>
                <input type="text" v-model="product.name" class="form-control" id="productName" maxlength="32" placeholder="Enter product name" required>
            </div>
            <div class="form-group col-12 col-md-6 col-lg-4">
                <label for="productDescription">Product description <small class="text-muted">(optional)</small></label>
                <textarea class="form-control"  v-model="product.description"  id="productDescription" rows="3" maxlength="128" placeholder="Enter description"></textarea>
            </div>
            <div class="form-group col-12 col-md-6 col-lg-4">
                <label for="price">Price</label>
                <input type="number" v-model="product.price" class="form-control" id="price" placeholder="Enter Price" number required>
            </div>
            <div class="col">
            <button type="submit" class="btn btn-primary" @click="addProduct" >Add product</button>
            </div>
            </form>
        </div>
        </div>
    </div>
    </div>

    <div class="col">
      <div class="row">
          <div class="col-12 col-md-6 col-lg-3" v-for="(pd, index) in category.productList" :key="index">
              <div class="card">
                    <button type="button" @click="removeProduct(index)" class="card-block text-right close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                  <img class="card-img-top" v-bind:src="imageSrc=pd.imageUrl" @error="imageLoadError" alt="Card image cap">
                  <div class="card-body">
                      <h4 class="card-title">{{ pd.name }}</h4>
                      <span class="badge badge-primary"><i class="fa fa-thumbs-up"></i> Like {{ pd.answer.yes }}</span>
                      <span class="badge badge-secondary"><i class="fa fa-thumbs-down"></i> DisLike {{  pd.answer.no }}</span>
                      <p class="card-text"> {{ pd.description }} </p>
                      <div class="row">
                          <div class="col">
                              <p class="btn btn-danger btn-block">{{ pd.price }} $</p>
                          </div>
                          <div class="col">
                              <a @click="getAnswer(pd)" class="btn btn-success btn-block"> <i class="fas fa-question-circle"></i> Ask </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'add-product',
    props: ['category', 'catindex'],
    data: function () {
      return {
        count: 0,
        product: {},
        showImg: '',
        isOpen: false
        //products: [{name:'asd', description:'ss', price:10},{name:'asd', description:'ss', price:10},{name:'asd', description:'ss', price:10}]
      }
    },
    methods:{
        addProduct(){
            var form = $('#' + this.categoryForm)
            if (form[0].checkValidity() === false) {
              event.preventDefault()
              event.stopPropagation()
              form.addClass('was-validated');
            }
            else{
                this.$emit('added-product', this.product, this.catindex)
                form.removeClass('was-validated');
                this.product = {}
            }
        },
        removeProduct(index){
            this.$emit('removed-product', this.catindex, index)
        },
        imageLoadError (event) {
            event.target.src = "https://dummyimage.com/600x400/55595c/fff"
        },
        getAnswer:  function (product) {
            var vm = product
            axios.get('https://yesno.wtf/api')
              .then(function (response) {
                  var answerRes = response.data.answer
                if(answerRes === 'yes')
                    vm.answer.yes++;
                else if(answerRes === 'no')
                    vm.answer.no++;
              })
              .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
              })
        },
        setState: function(){
            this.isOpen = !this.isOpen
        }
    },
    computed: {
        imageSrc:  {
            get: function () {
            return this.showImg
          },
          set: function (newValue) {
            this.showImg = newValue
          }
        },
        productCount: function(){
            return this.category.productList.length
        },
        recommendedCount: function(){
            var cnt = 0
            this.category.productList.forEach(element => {
                cnt += element.answer.yes;
            });
            return cnt
        },
        notrecommendedCount: function(){
            var cnt = 0
            this.category.productList.forEach(element => {
                cnt += element.answer.no;
            });
            return cnt
        },
        categoryLinkCollapse: function(){
            return "#" + this.trimSpace(this.category.categoryName) + "Collapse"
        },
        categoryNameCollapse: function(){
            return this.trimSpace(this.category.categoryName) + "Collapse"
        },
        isAddProduct: function(){
            if(this.isOpen)
                return "far fa-minus-square"
            else
                return "far fa-plus-square"
        },
        categoryForm: function(){
            return this.trimSpace(this.category.categoryName) + "Form"
        }
    }
}
</script>