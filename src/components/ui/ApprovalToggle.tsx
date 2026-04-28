import { Toggle, InlineNotification } from '@carbon/react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApprovalToggleProps {
  mode: 'manual' | 'autonomous';
  onChange: (mode: 'manual' | 'autonomous') => void;
  size?: 'sm' | 'md';
  showDescription?: boolean;
}

export function ApprovalToggle({ mode, onChange, size = 'md', showDescription = true }: ApprovalToggleProps) {
  const isAutoApprove = mode === 'autonomous';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Toggle
          id="approval-mode-toggle"
          size={size}
          toggled={isAutoApprove}
          onToggle={(checked: boolean) => onChange(checked ? 'autonomous' : 'manual')}
          labelText=""
          labelA="Off"
          labelB="On"
        />
        <span className="text-body font-medium text-carbon-gray-100">
          Auto-Approve: {isAutoApprove ? 'Bật' : 'Tắt'}
        </span>
      </div>

      {showDescription && (
        <AnimatePresence mode="wait">
          {isAutoApprove ? (
            <motion.div
              key="auto-on"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <InlineNotification
                kind="warning"
                title="Auto-Approve bật:"
                subtitle="Bob tự thực thi không cần xác nhận. Nhanh hơn nhưng cần cẩn thận — có thể gây mất dữ liệu hoặc thay đổi ngoài ý muốn. Chỉ dùng trong môi trường dev an toàn."
                lowContrast
              />
            </motion.div>
          ) : (
            <motion.div
              key="auto-off"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <InlineNotification
                kind="info"
                title="Auto-Approve tắt (mặc định):"
                subtitle="Bob hiển thị từng action và chờ bạn xác nhận trước khi thực thi. Phù hợp với môi trường có yêu cầu compliance và audit trail."
                lowContrast
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
