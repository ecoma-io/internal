import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface IChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  isEdited?: boolean;
}

export interface IChatChannel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members: string[];
  unreadCount: number;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-[calc(100vh-4rem)] flex">
      <!-- Sidebar -->
      <div class="w-64 bg-base-100 border-r border-base-200 flex flex-col">
        <!-- Channel Search -->
        <div class="p-4 border-b border-base-200">
          <div class="form-control">
            <div class="input-group input-group-sm">
              <input type="text" placeholder="Search channels..." class="input input-bordered input-sm w-full" />
              <button class="btn btn-square btn-sm">
                <span class="text-lg">🔍</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Channels List -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold">Channels</h3>
              <button class="btn btn-ghost btn-xs" (click)="openNewChannelModal()" role="button" tabindex="0" (keyup.enter)="openNewChannelModal()" (keyup.space)="openNewChannelModal()">
                <span class="text-lg">➕</span>
              </button>
            </div>
            
            <ul class="menu menu-sm">
              <li *ngFor="let channel of channels">
                <a [class.active]="currentChannel?.id === channel.id"
                   (click)="selectChannel(channel)"
                   (keyup.enter)="selectChannel(channel)"
                   (keyup.space)="selectChannel(channel)"
                   role="button" 
                   tabindex="0"
                   class="flex justify-between">
                  <span class="flex items-center gap-2">
                    <span class="text-sm">{{ channel.isPrivate ? '🔒' : '#' }}</span>
                    {{ channel.name }}
                  </span>
                  <span *ngIf="channel.unreadCount > 0" 
                        class="badge badge-sm badge-primary">
                    {{ channel.unreadCount }}
                  </span>
                </a>
              </li>
            </ul>

            <div class="divider my-2"></div>

            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold">Direct Messages</h3>
              <button class="btn btn-ghost btn-xs" (click)="openNewDMModal()" role="button" tabindex="0" (keyup.enter)="openNewDMModal()" (keyup.space)="openNewDMModal()">
                <span class="text-lg">➕</span>
              </button>
            </div>

            <ul class="menu menu-sm">
              <li *ngFor="let user of users">
                <a class="flex justify-between items-center">
                  <span class="flex items-center gap-2">
                    <div class="avatar">
                      <div class="w-6 h-6 rounded-full">
                        <img [src]="user.avatar" [alt]="user.name" />
                      </div>
                    </div>
                    {{ user.name }}
                  </span>
                  <span class="badge badge-sm badge-success"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Main Chat Area -->
      <div class="flex-1 flex flex-col bg-base-200">
        <!-- Channel Header -->
        <div class="bg-base-100 border-b border-base-200 p-4">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-lg font-bold flex items-center gap-2">
                <span>{{ currentChannel?.isPrivate ? '🔒' : '#' }}</span>
                {{ currentChannel?.name }}
              </h2>
              <p class="text-sm opacity-70">{{ currentChannel?.description }}</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-ghost btn-sm">
                <span class="text-lg">👥</span>
                {{ currentChannel?.members?.length || 0 }} members
              </button>
              <button class="btn btn-ghost btn-sm">
                <span class="text-lg">⚙️</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div *ngFor="let message of messages" 
               class="chat" 
               [class.chat-start]="message.userId !== currentUserId"
               [class.chat-end]="message.userId === currentUserId">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img [src]="message.userAvatar" [alt]="message.userName" />
              </div>
            </div>
            <div class="chat-header">
              {{ message.userName }}
              <time class="text-xs opacity-50 ml-1">
                {{ message.timestamp | date:'shortTime' }}
              </time>
            </div>
            <div class="chat-bubble">{{ message.content }}</div>
            <div class="chat-footer opacity-50" *ngIf="message.isEdited">
              edited
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="bg-base-100 border-t border-base-200 p-4">
          <div class="flex gap-2">
            <div class="form-control flex-1">
              <div class="input-group">
                <input type="text" 
                       [(ngModel)]="newMessage"
                       (keyup.enter)="sendMessage()"
                       placeholder="Type a message..."
                       class="input input-bordered w-full" />
                <button class="btn btn-square" (click)="openEmojiPicker()">
                  <span class="text-lg">😊</span>
                </button>
                <button class="btn btn-square" (click)="openAttachmentMenu()">
                  <span class="text-lg">📎</span>
                </button>
              </div>
            </div>
            <button class="btn btn-primary" 
                    [disabled]="!newMessage.trim()"
                    (click)="sendMessage()">
              Send
            </button>
          </div>
        </div>
      </div>

      <!-- Thread Panel (hidden by default) -->
      <div class="w-80 bg-base-100 border-l border-base-200 hidden">
        <!-- Thread implementation here -->
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  currentUserId = 'user-1';
  currentChannel?: IChatChannel;
  newMessage = '';

  channels: IChatChannel[] = [
    {
      id: 'channel-1',
      name: 'general',
      description: 'General discussion channel',
      isPrivate: false,
      members: ['user-1', 'user-2', 'user-3'],
      unreadCount: 0
    },
    {
      id: 'channel-2',
      name: 'announcements',
      description: 'Important announcements',
      isPrivate: false,
      members: ['user-1', 'user-2', 'user-3'],
      unreadCount: 2
    },
    {
      id: 'channel-3',
      name: 'team-private',
      description: 'Private team discussion',
      isPrivate: true,
      members: ['user-1', 'user-2'],
      unreadCount: 5
    }
  ];

  users = [
    {
      id: 'user-1',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      status: 'online'
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      status: 'offline'
    },
    {
      id: 'user-3',
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      status: 'away'
    }
  ];

  messages: IChatMessage[] = [
    {
      id: 'msg-1',
      userId: 'user-2',
      userName: 'Jane Smith',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      content: 'Hey everyone! How\'s it going?',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 'msg-2',
      userId: 'user-1',
      userName: 'John Doe',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      content: 'Working on the new feature. Almost done!',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 'msg-3',
      userId: 'user-3',
      userName: 'Mike Johnson',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      content: 'Great progress everyone! Keep it up 👍',
      timestamp: new Date(Date.now() - 900000)
    }
  ];

  ngOnInit() {
    this.currentChannel = this.channels[0];
  }

  selectChannel(channel: IChatChannel) {
    this.currentChannel = channel;
    channel.unreadCount = 0;
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const message: IChatMessage = {
      id: `msg-${Date.now()}`,
      userId: this.currentUserId,
      userName: 'John Doe',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      content: this.newMessage,
      timestamp: new Date()
    };

    this.messages.push(message);
    this.newMessage = '';
  }

  openNewChannelModal() {
    // Implement new channel modal
  }

  openNewDMModal() {
    // Implement new DM modal
  }

  openEmojiPicker() {
    // Implement emoji picker
  }

  openAttachmentMenu() {
    // Implement attachment menu
  }
}