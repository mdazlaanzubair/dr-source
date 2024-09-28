import { notification } from "antd";

/**
 * Utility function to trigger Ant Design notifications.
 * @param {string} type - The type of notification ('success', 'error', 'info', 'warning').
 * @param {string} message - The main message of the notification.
 * @param {string} description - Additional information about the notification.
 * @param {number} [duration=4.5] - Duration in seconds before notification is dismissed. Set to 0 for indefinite.
 */
export const notify = (
  type = "info",
  message = "Notification Title",
  description,
  placement = "bottomRight",
  duration = 5
) => {
  notification[type]({
    message,
    description,
    duration,
    placement, // You can change this to 'topLeft', 'bottomLeft', 'topRight'
    showProgress:true
  });
};
