class NotifySocketHandler {
  constructor(socket) {
    this.socket = socket;
    this.init();
  }

  init() {
    // 알림 방에 참여
    this.socket.emit('joinNotificationRoom');

    // 메시지 수신 핸들러 설정
    this.socket.on('newMessage', (message) => {
      console.log(`새 알림: ${message}`);
    });

    this.socket.on('joinedRoom', (message) => {
      console.log(`방 참여: ${message}`);
    });
  }
}

export default NotifySocketHandler;
