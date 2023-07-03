import { HttpResponse } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: { sender: string, text: string }[] = [];
  userInput: string = '';
  audioUrl: string | undefined;

  constructor(private chatService: ChatService) { }

  sendMessage() {
    const userMessage = this.userInput;
    if (userMessage) {
      this.messages.push({ sender: 'user', text: userMessage });
      this.userInput = '';

      this.chatService.sendUserMessage(userMessage).subscribe(
        (response) => {
          const assistantMessage = response[0].queryResult.fulfillmentText;
          this.messages.push({ sender: 'assistant', text: assistantMessage });
          /*Convert the outputAudio data to a typed array*/
          const outputAudioData = response[0].outputAudio.data;
          const typedArray = new Uint8Array(outputAudioData);
          /*Create a Blob from the typed array with the appropriate audio MIME type*/
          const blob = new Blob([typedArray], { type: 'audio/wav' });
          /**Create a URL for the Blob object */
          const audioUrl = URL.createObjectURL(blob);
          /**Create a new HTML5 Audio element and set its source to the audio URL */
          const audio = new Audio(audioUrl);
          audio.play();

        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
