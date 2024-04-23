<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);
const title = import.meta.env.VITE_APP_TITLE;

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-bc' : 'logo-bc'}.png`;
});
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
                class="w-full md:w-30rem"
                style="padding: 1rem"
                v-model="email"
              />
              <label for="username">用户名</label>
            </FloatLabel>
            <FloatLabel class="mb-5">
              <Password
                inputId="password"
                v-model="password"
                placeholder=""
                :toggleMask="true"
                class="w-full"
                inputClass="w-full"
                :inputStyle="{ padding: '1rem' }"
                :feedback="false"
              ></Password>
              <label for="password">密码</label>
            </FloatLabel>
            <FloatLabel class="mb-5 flex align-items-center gap-3">
              <InputText
                id="vCode"
                type="text"
                placeholder=""
                style="padding: 1rem"
                class="flex-1"
                v-model="email"
              />
              <label for="vCode">验证码</label>
              <Image src="/image.jpg" alt="Image" width="300" />
            </FloatLabel>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <div class="flex align-items-center">
                <Checkbox v-model="checked" inputId="rememberme1" binary class="mr-2"></Checkbox>
                <label for="rememberme1">记住密码</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
              >
                忘记密码?
              </a>
            </div>
            <Button label="登录" class="w-full p-3 text-xl"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppConfig simple />
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
