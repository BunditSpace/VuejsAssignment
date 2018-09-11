<template>
    <div>
          <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <section class="jumbotron text-center header-logo">
        <div class="title">
            <h1>Shoe Shop</h1>
        </div>
    </section>

    <!-- <div id="shoesShop"> -->
        <div class="container-fluid">
        <div>
            <div class="form-inline">
                <div class="form-group mb-2">
                    <input type="text" placeholder="Enter category name" class="form-control" v-model="categoryName"/>
                </div>
                <div class="form-group mx-sm-3 mb-2">
                    <button v-on:click="addCategory" class="btn btn-success">Add Category</button>
                </div>
                <div class="alert alert-warning" v-show="!isValid">
                    <strong>Warning!</strong> Category is not valid.
                </div>
                <div class="alert alert-warning" v-show="isExist">
                    <strong>Warning!</strong> Category is exist already.
                </div>
                <br/>
            </div>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" v-for="(cat, index) in categoryList" :key="index">    
                  <a class="nav-link" v-bind:id="getTabId(cat.categoryName)" data-toggle="pill" v-bind:href="getTargetId(cat.categoryName)" role="tab" v-bind:aria-controls="getContentId(cat.categoryName)">
                        {{ cat.categoryName }}
                        &nbsp;
                        <button class="close closeTab" type="button" @click="removeCategory(index)"> 
                        <span aria-hidden="true">&times;</span></button>
                  </a>
                </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade" v-for="(cat, index) in categoryList" :key="index" v-bind:id="getContentId(cat.categoryName)" role="tabpanel" aria-labelledby="getTabId(cat.categoryName)">
                    <add-product 
                    v-bind:category="cat"
                    v-bind:catindex="index"
                    @added-product="onAddedChild"
                    @removed-product="onRemovedChild" >
                <hr/>
                </add-product>
                </div>
            </div>
        </div>
        </div>
    <!-- </div> -->
    </div>
</template>
<script>
import AddProduct from '@/components/AddProduct.vue'

export default {
  name: 'home',
  components: {
    AddProduct
  },
  data: function () {
      return {
        count: 0,
        categoryName: '',
        categoryList: [],
        isExist: false,
        isValid: true
      }
    },
    methods:{
      addCategory() {
        this.isExist = this.isExistCategory(this.categoryName);
        this.isValid = this.isCssIdValid(this.categoryName);
        if(this.isExist === false && this.isValid === true){
        if(this.categoryName)
          this.categoryList.push({
            categoryName: this.categoryName,
            productList: []
          })
          this.categoryName = ''
        }
      },
      isCssIdValid (id) {
        //var regex1 = new RegExp("^[A-Za-z]+[\w\-\:\.]*$");
        var re = /^[A-Za-z]+[\w\-\:\.]*$/
        return re.test(id)
      },
      isExistCategory(categoryName){
        let result = false
        for (let element of this.categoryList) {
          if (element.categoryName === categoryName) {
            result = true
            break;
          }
        }
        return result
      },
      onAddedChild (product, catindex) {
        if(product.name && product.price){
          let imageUrl = product.imageUrl ?  product.imageUrl : 'https://dummyimage.com/600x400/55595c/fff' 
          this.categoryList[catindex].productList.push({
              name: product.name,
              description: product.description,
              price: product.price,
              imageUrl: imageUrl,
              answer: { "yes" : 0, "no": 0 }
            })
        }
      },
      onRemovedChild(catindex, index){
        this.categoryList[catindex].productList.splice(index, 1)
      },
      getTabId(categoryName){
        return this.trimSpace(categoryName) + "-tab"
      },
      getTargetId(categoryName){
        return "#" + this.trimSpace(categoryName)
      },
      getContentId(categoryName){
        return this.trimSpace(categoryName)
      },
      removeCategory(categoryIndex){
        this.categoryList.splice(categoryIndex, 1)
      }
    }
}
</script>

<style scoped>

.header-logo {
  background-image: url('../assets/img/logo.jpg'); 
  height: 25%; 
  background-repeat: no-repeat; 
  background-size: cover; 
  opacity: 0.7;
}
.title {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    background-color:dimgray;
}
h1 {
    text-transform: uppercase;
    margin: 0;
    font-size: 3rem;
    white-space: nowrap;
}
</style>
