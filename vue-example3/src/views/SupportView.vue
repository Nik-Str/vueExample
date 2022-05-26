<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div>
      <div class="list-group shadow flex flex-row bg-light mb-3">
        <button
          type="button"
          class="list-group-item list-group-item-action list-group-item-light text-center border-1 rounded"
          :style="{ minWidth: '5rem', maxWidth: '5rem' }"
          v-for="(item, index) in $store.state.supportList"
          :key="index"
          @click="
            $store.commit('setSupportId', item);
            $store.dispatch('getSupportChat', item);
          "
          :class="{ active: $store.state.supportId === item }"
        >
          {{ index }}
        </button>
      </div>
      <div>
        <div class="bg-light rounded supportWindow d-flex justify-content-between flex-column shadow">
          <div
            class="d-flex justify-content-between align-items-center px-2 py-2 border-bottom"
            :style="{ minHeight: '4rem' }"
          >
            <button type="button" class="border-0 bg-light" @click="$store.dispatch('getSupportList')">
              <i
                v-if="!$store.state.isLoadingSupportUpdate"
                class="bi bi-arrow-clockwise fs-5"
                :style="{ color: 'grey' }"
              ></i>
              <div
                v-if="$store.state.isLoadingSupportUpdate"
                class="spinner-border spinner-border-sm text-dark"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
            <p class="fw-bold my-auto">Support</p>
            <button
              type="button"
              class="border-0 bg-light"
              @click="$store.dispatch('removeSupportChat', $store.state.supportId)"
            >
              <i v-if="!$store.state.isLoadingSupportUpdate" class="bi bi-x fs-3" :style="{ color: 'grey' }"></i>
              <div
                v-if="$store.state.isLoadingSupportUpdate"
                class="spinner-border spinner-border-sm text-dark"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
          <div>
            <div class="chatContainer px-2 pb-1 pt-2">
              <div
                class="msg rounded my-1"
                v-for="(item, index) in $store.state.supportChat.slice().reverse()"
                :class="{ client: item.client, support: !item.client }"
                :key="index + 'aA2Q!'"
              >
                {{ item.msg }}
              </div>
            </div>
            <div class="input-group mt-auto">
              <textarea
                v-model="ticket"
                :disabled="!$store.state.supportId"
                type="text"
                class="form-control"
                placeholder="Aaa"
                rows="1"
              />
              <button
                :disabled="!ticket"
                class="btn btn-dark"
                type="button"
                @click="
                  $store.commit('sendSupportTicket', { msg: ticket, client: false });
                  this.ticket = '';
                "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupportView',
  data() {
    return {
      ticket: '',
    };
  },
  mounted() {
    this.$store.commit('initSupportChat', 'support');
    this.$store.dispatch('getSupportList');
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 80vh;
}

.supportWindow {
  width: 30rem;
  height: 40vh;
}

.chatContainer {
  max-height: 28.5vh;
  min-height: 28.5vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

.list-group {
  max-width: 30rem;
  overflow-x: auto;
}

.msg {
  font-size: 0.8rem;
  padding: 0.4rem;
  margin-top: 0.4rem;
}

.client {
  margin-right: 4rem;
  background-color: rgba(0, 0, 0, 0.08);
}

.support {
  margin-left: 4rem;
  background-color: rgba(0, 0, 0, 0.25);
}

textarea {
  max-height: 4rem;
  font-size: 0.9rem;
}

@media only screen and (max-width: 500px) {
  .supportWindow {
    width: 95vw;
  }

  .list-group {
    max-width: 95vw;
  }
}
</style>
