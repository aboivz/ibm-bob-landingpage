import { Bot } from '@carbon/icons-react';
import { IBM_SOURCES } from '@lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-carbon-gray-100 border-t border-carbon-gray-80">
      <div className="max-w-content mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-carbon-blue-60 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <span className="font-semibold text-white">IBM Bob</span>
            </div>
            <p className="text-caption text-carbon-gray-50 leading-relaxed">
              AI SDLC Partner — hỗ trợ toàn bộ vòng đời phát triển phần mềm từ Spec đến Deploy.
              Hiện ở giai đoạn preview.
            </p>
          </div>

          {/* Nguồn số liệu */}
          <div>
            <h4 className="text-caption font-semibold text-carbon-gray-30 mb-3 uppercase tracking-wider">
              Nguồn số liệu
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={IBM_SOURCES.meetBob}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-carbon-gray-50 hover:text-carbon-blue-60 transition-colors"
                >
                  IBM Think: Meet Bob — 45% productivity gain, 10K+ users
                </a>
              </li>
              <li>
                <a
                  href={IBM_SOURCES.bobProduct}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-carbon-gray-50 hover:text-carbon-blue-60 transition-colors"
                >
                  IBM Bob Product Page
                </a>
              </li>
              <li>
                <a
                  href={IBM_SOURCES.bobAnnouncement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-carbon-gray-50 hover:text-carbon-blue-60 transition-colors"
                >
                  IBM Project Bob Announcement
                </a>
              </li>
            </ul>
          </div>

          {/* Tài nguyên */}
          <div>
            <h4 className="text-caption font-semibold text-carbon-gray-30 mb-3 uppercase tracking-wider">
              Tài nguyên
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={IBM_SOURCES.bobHomepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-carbon-gray-50 hover:text-carbon-blue-60 transition-colors"
                >
                  bob.ibm.com
                </a>
              </li>
              <li>
                <a
                  href={IBM_SOURCES.bobGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-carbon-gray-50 hover:text-carbon-blue-60 transition-colors"
                >
                  GitHub: IBM/ibm-bob
                </a>
              </li>
              <li>
                <a
                  href={IBM_SOURCES.carbonDesign}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-carbon-gray-50 hover:text-carbon-blue-60 transition-colors"
                >
                  IBM Carbon Design System
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-carbon-gray-80 pt-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-caption text-carbon-gray-60">
            © {currentYear} IBM Corporation. Landing page được xây dựng bởi IBM Partner tại Việt Nam.
          </p>
          <p className="text-caption text-carbon-gray-60 max-w-xl">
            <strong className="text-carbon-gray-50">Disclaimer:</strong> IBM Bob hiện ở giai đoạn
            preview. Tất cả demo trong trang này là mô phỏng walkthrough. Số liệu trích dẫn từ
            IBM internal program. Liên hệ partner để biết lộ trình triển khai tại Việt Nam.
          </p>
        </div>
      </div>
    </footer>
  );
}
