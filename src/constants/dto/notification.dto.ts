import { Notification } from '../interface/notification.interface'
import { queryOperator } from './queryOperator.dto'

export interface NotificationDTO extends Notification {}

export interface FilterNotificationDTO {
  notificationId?: string | [queryOperator, string]
  targetUserId?: string | [queryOperator, string]
  relevantUserId?: string | [queryOperator, string]
  type?: string | [queryOperator, string]
  body?: string | [queryOperator, string]
  link?: string | [queryOperator, string]
  isRead?: boolean | [queryOperator, boolean]
}
