<template>
  <div
    v-if="$store.state.displaySupport"
    class="bg-light rounded supportWindow d-flex justify-content-between flex-column"
  >
    <div class="d-flex justify-content-between align-items-center px-2 py-2 border-bottom">
      <p class="fw-bold my-auto">Support</p>
      <button type="button" class="btn-close" @click="$store.commit('setDisplaySupport')"></button>
    </div>
    <div>
      <p class="text-center m-0 p-0 pt-1 text-secondary" :style="{ fontSize: '0.8rem' }">Beskriv ditt ärende?</p>
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
        <textarea v-model="ticket" type="text" class="form-control" placeholder="Aaa" rows="1" />
        <button
          :disabled="!ticket"
          class="btn btn-dark"
          type="button"
          @click="
            $store.commit('sendSupportTicket', { msg: ticket, client: true });
            this.ticket = '';
          "
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupportWindow',
  data() {
    return {
      ticket: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.supportWindow {
  position: fixed;
  right: 0.5rem;
  bottom: 0rem;
  border: 1px solid #dee2e6 !important;
  width: 18rem;
  height: 40vh;
  z-index: 10;
}

.chatContainer {
  max-height: 28.5vh;
  min-height: 28.5vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

.msg {
  font-size: 0.8rem;
  padding: 0.4rem;
  margin-top: 0.4rem;
  background-color: rgba(0, 0, 0, 0.08);
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

@media only screen and (max-width: 300px) {
  .supportWindow {
    width: 95vw;
  }
}
</style>
