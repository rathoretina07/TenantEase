import { EventEmitter } from 'events';

// ── Event Types ─────────────────────────────────────────────────────────────
export enum AppEvent {
  // Auth
  USER_REGISTERED = 'USER_REGISTERED',
  USER_LOGGED_IN = 'USER_LOGGED_IN',

  // Property
  PROPERTY_CREATED = 'PROPERTY_CREATED',
  PROPERTY_UPDATED = 'PROPERTY_UPDATED',

  // Payments
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',

  // Messages
  MESSAGE_SENT = 'MESSAGE_SENT',

  // Notifications
  NOTIFICATION_CREATED = 'NOTIFICATION_CREATED',

  // Generic data update (triggers dashboard refresh)
  DATA_UPDATED = 'DATA_UPDATED',
}

export interface AppEventPayload {
  event: AppEvent;
  /** User IDs that should receive a Socket.io push */
  targetUserIds: string[];
  /** The actual payload data */
  data: Record<string, unknown>;
  /** Timestamp of the event */
  timestamp: Date;
}

// ── Singleton Event Emitter ─────────────────────────────────────────────────
class AppEventBus extends EventEmitter {
  private static instance: AppEventBus;

  private constructor() {
    super();
    this.setMaxListeners(50);
  }

  static getInstance(): AppEventBus {
    if (!AppEventBus.instance) {
      AppEventBus.instance = new AppEventBus();
    }
    return AppEventBus.instance;
  }

  /** Emit a typed application event */
  dispatch(payload: AppEventPayload): void {
    this.emit(payload.event, payload);
    // Also emit a generic DATA_UPDATED so dashboard listeners refresh
    if (payload.event !== AppEvent.DATA_UPDATED) {
      this.emit(AppEvent.DATA_UPDATED, payload);
    }
  }
}

export const eventBus = AppEventBus.getInstance();
