<!-- @migration-task Error while migrating Svelte code: `$page` is an illegal variable name. To reference a global variable called `$page`, use `globalThis.$page`
https://svelte.dev/e/global_reference_invalid -->
<script lang="ts">

import * as api from '$lib/api';
 
/** @type {import('./$types').PageServerLoad} */

    </script>
    <main>

        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="/">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <a class="nav-link" class:active={$page.url.pathname === '/'} href="/">Home</a>
                    </li>
         
                        <li class="nav-item">
                            <a href="/login" class="nav-link" class:active={$page.url.pathname === '/login'}>
                                Sign in
                            </a>
                        </li>
        
                        <li class="nav-item">
                            <a href="/register" class="nav-link" class:active={$page.url.pathname === '/register'}>
                                Sign up
                            </a>
                        </li>
                 </ul>
            </div>
        </nav>
        
        
    </main>
