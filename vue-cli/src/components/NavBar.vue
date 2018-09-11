<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <router-link to="/" class="nav-item nav-link active">Go to Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Bar" class="nav-item nav-link">Go to Bar</router-link>
            </li>
          </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar'
}
</script>

