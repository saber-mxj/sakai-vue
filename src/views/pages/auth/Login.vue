<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, shallowRef, onMounted, watch, reactive } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { getCodeImg } from '@/api/login';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { encrypt } from '@/utils/jsencrypt';
import useUserStore from '@/store/modules/user';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const userStore = useUserStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const { layoutConfig } = useLayout();
const uuid = shallowRef('');
const codeUrl = ref('');
const captchaEnabled = ref(true); // 验证码开关
const rememberMe = ref(false);
const loading = ref(false);
const redirect = ref(undefined);
const title = import.meta.env.VITE_APP_TITLE;
const form = reactive({
  username: '',
  password: '',
  vCode: ''
});
const formRules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('用户名不能为空', required)
    },
    password: {
      required: helpers.withMessage('密码不能为空', required)
    },
    vCode: captchaEnabled.value
      ? {
          required: helpers.withMessage('验证码不能为空', required)
        }
      : undefined
  };
});
const v$ = useVuelidate(formRules, form);

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-bc' : 'logo-bc'}.png`;
});

const getVCode = () => {
  getCodeImg().then((res) => {
    captchaEnabled.value = res.captchaEnabled !== false;
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img;
      uuid.value = res.uuid;
    }
  });
};

const handleLogin = () => {
  v$.value.$validate().then((isValid) => {
    if (isValid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (rememberMe.value) {
        Cookies.set('username', form.username, { expires: 30 });
        Cookies.set('password', encrypt(form.password), { expires: 30 });
        Cookies.set('rememberMe', rememberMe.value, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }
      // 调用action的登录方法
      userStore
        .login({
          username: form.username,
          password: form.password,
          code: form.vCode,
          uuid: uuid.value
        })
        .then(() => {
          const query = route.query;
          const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirect') {
              acc[cur] = query[cur];
            }
            return acc;
          }, {});
          router.push({ path: redirect.value || '/', query: otherQueryParams });
        })
        .catch(() => {
          loading.value = false;
          // 重新获取验证码
          if (captchaEnabled.value) {
            getVCode();
          }
        });
    }
  });
};

onMounted(() => {
  getVCode();
});

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect;
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div class="w-full surface-card py-6 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">{{ title }}</div>
          </div>

          <div>
            <FloatLabel class="mb-5">
              <InputText
                id="username"
                type="text"
                placeholder=""
                class="w-full md:w-25rem"
                v-model="form.username"
                :invalid="v$.username.$error"
                @blur="v$.username.$validate"
              />
              <label for="username">
                <span class="p-error" v-if="v$.username.$error">
                  {{ v$.username.$errors.map((err) => err.$message).join(',') }}
                </span>
                <span v-else>用户名</span>
              </label>
            </FloatLabel>

            <FloatLabel class="mb-5">
              <Password
                inputId="password"
                v-model="form.password"
                placeholder=""
                :toggleMask="true"
                class="w-full"
                inputClass="w-full"
                :feedback="false"
                :invalid="v$.password.$error"
                @blur="v$.password.$validate"
              ></Password>
              <label for="password">
                <span class="p-error" v-if="v$.password.$error">
                  {{ v$.password.$errors.map((err) => err.$message).join(',') }}
                </span>
                <span v-else>密码</span>
              </label>
            </FloatLabel>
            <FloatLabel v-if="captchaEnabled" class="mb-5 flex align-items-center gap-3">
              <InputText
                id="vCode"
                type="text"
                placeholder=""
                class="flex-1"
                v-model="form.vCode"
                :invalid="v$.vCode.$error"
                @blur="v$.vCode.$validate"
              />
              <label for="vCode">
                <span class="p-error" v-if="v$.vCode.$error">
                  {{ v$.vCode.$errors.map((err) => err.$message).join(',') }}
                </span>
                <span v-else>验证码</span>
              </label>
              <Image
                :src="codeUrl"
                alt="Image"
                style="height: 2.857rem"
                imageStyle="height: 100%"
                class="cursor-pointer"
                @click="getVCode"
              />
            </FloatLabel>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <div class="flex align-items-center">
                <Checkbox v-model="rememberMe" inputId="rememberme1" binary class="mr-2"></Checkbox>
                <label for="rememberme1">记住密码</label>
              </div>
              <!--              <a-->
              <!--                class="font-medium no-underline ml-2 text-right cursor-pointer"-->
              <!--                style="color: var(&#45;&#45;primary-color)"-->
              <!--              >-->
              <!--                忘记密码?-->
              <!--              </a>-->
            </div>
            <Button
              label="登录"
              class="w-full p-3 text-xl"
              :loading="loading"
              @click="handleLogin"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppConfig simple />
  <Toast />
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
