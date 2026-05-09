# BÁO CÁO TỔNG QUAN, MỤC TIÊU VÀ PHÂN TÍCH CHỨC NĂNG DỰ ÁN CÁ NHÂN

## 1. Tổng quan dự án cá nhân

### 1.1. Tên và định hướng dự án

Dự án có tên là Landing Page Portfolio Cá Nhân, được xây dựng theo mô hình website đơn trang nhằm giới thiệu hồ sơ cá nhân trong lĩnh vực phát triển phần mềm. Định hướng của dự án là kết hợp giữa trình bày nội dung chuyên môn có cấu trúc và trải nghiệm giao diện hiện đại, từ đó nâng cao hiệu quả truyền tải thông tin tới người xem.

### 1.2. Mục đích xây dựng

Mục đích cốt lõi của dự án là hình thành một kênh hồ sơ số tập trung, cho phép người dùng tiếp cận nhanh các thông tin quan trọng như định danh cá nhân, kỹ năng chuyên môn, kinh nghiệm thực hành và kênh liên hệ. Sản phẩm hướng tới tính súc tích, trực quan và có khả năng tạo ấn tượng ngay trong lần truy cập đầu tiên.

### 1.3. Công nghệ triển khai

Dự án được phát triển bằng Next.js (App Router), React, TypeScript và Tailwind CSS; đồng thời tích hợp hiệu ứng 2D Canvas và 3D nhằm tăng mức độ tương tác thị giác. Cách lựa chọn công nghệ thể hiện mục tiêu vừa đảm bảo tính hiện đại của giao diện, vừa duy trì khả năng mở rộng kỹ thuật về sau.

## 2. Mục tiêu dự án

### 2.1. Mục tiêu tổng quát

Xây dựng một trang portfolio cá nhân có khả năng trình bày năng lực nghề nghiệp một cách rõ ràng, chuyên nghiệp và thuyết phục; đồng thời hỗ trợ kết nối nhanh với nhà tuyển dụng, đối tác và cộng đồng chuyên môn.

### 2.2. Mục tiêu cụ thể

- Chuẩn hóa thông tin nhận diện cá nhân trên một giao diện thống nhất.
- Trình bày kỹ năng theo nhóm để tăng tốc độ đọc hiểu nội dung kỹ thuật.
- Bổ sung mục kinh nghiệm thực hành với mốc thời gian từ năm 2025 nhằm thể hiện tính cập nhật của hồ sơ.
- Tăng tỷ lệ điều hướng người dùng từ trang giới thiệu sang các kênh liên hệ bên ngoài.
- Đảm bảo khả năng hiển thị ổn định trên cả thiết bị di động và máy tính để bàn.

### 2.3. Đối tượng hướng đến

- Nhà tuyển dụng và quản lý kỹ thuật cần đánh giá nhanh năng lực ứng viên.
- Đối tác hoặc khách hàng cần tham chiếu hồ sơ chuyên môn trước khi hợp tác.
- Cộng đồng lập trình viên quan tâm phong cách xây dựng portfolio cá nhân.

## 3. Phân tích chức năng dự án cá nhân

### 3.1. Chức năng hiển thị hồ sơ cá nhân

Chức năng này bao gồm ảnh đại diện, họ tên, biệt danh và vai trò nghề nghiệp. Đây là lớp thông tin đầu vào quan trọng, giúp người xem xác định chủ thể của trang và định vị chuyên môn ngay khi truy cập.

### 3.2. Chức năng giới thiệu bản thân (About)

Khối About cung cấp mô tả ngắn về định hướng nghề nghiệp và tư duy phát triển sản phẩm. Chức năng này hỗ trợ người xem hiểu nhanh giá trị chuyên môn cốt lõi mà không cần truy cập nhiều nguồn thông tin khác.

### 3.3. Chức năng hiển thị kỹ năng (Skills)

Kỹ năng được tổ chức theo các nhóm chính như ngôn ngữ lập trình, backend, cơ sở dữ liệu, DevOps và AI hỗ trợ phát triển. Việc phân nhóm giúp nâng cao tính hệ thống, hỗ trợ quá trình đối chiếu yêu cầu công việc với năng lực hiện có.

### 3.4. Chức năng hiển thị kinh nghiệm (Experience)

Mục Experience trình bày vai trò đảm nhiệm, giai đoạn thực hiện và các điểm nhấn kỹ thuật. Timeline được thống nhất từ năm 2025 đến hiện tại nhằm đảm bảo tính nhất quán nội dung và phản ánh quá trình phát triển năng lực theo giai đoạn gần nhất.

### 3.5. Chức năng kết nối (Connect)

Hệ thống cung cấp các liên kết tới Website, Facebook và GitHub. Các liên kết được mở ở tab mới để không làm gián đoạn trải nghiệm trên trang chính. Đây là chức năng có ý nghĩa chuyển đổi trực tiếp từ giai đoạn xem hồ sơ sang giai đoạn trao đổi thực tế.

### 3.6. Chức năng điều khiển âm thanh nền

Người dùng có thể phát, tạm dừng và bật/tắt tiếng nhạc nền. Chức năng này tăng tính cá nhân hóa trải nghiệm nhưng vẫn bảo đảm quyền chủ động của người truy cập.

### 3.7. Chức năng hiệu ứng hình ảnh

Hệ thống tích hợp hiệu ứng nền 3D, hiệu ứng hoa rơi 2D và con trỏ tùy biến. Vai trò của nhóm chức năng này là nâng cao sức hút thị giác, gia tăng khả năng ghi nhớ thương hiệu cá nhân và kéo dài thời gian tương tác.

### 3.8. Chức năng đáp ứng đa thiết bị

Giao diện được thiết kế theo hướng responsive, đảm bảo bố cục hiển thị phù hợp trên nhiều kích thước màn hình. Chức năng này góp phần duy trì tính liên tục trong trải nghiệm người dùng và giảm rủi ro lỗi trình bày.

## 4. Kết luận

Từ góc độ tổng quan, mục tiêu và chức năng, dự án đã hình thành được một nền tảng hồ sơ số có cấu trúc rõ ràng, thể hiện được năng lực cá nhân và hỗ trợ kết nối hiệu quả. Việc tập trung vào ba thành phần chính gồm tổng quan dự án, mục tiêu triển khai và phân tích chức năng cho thấy sản phẩm đáp ứng đúng định hướng của một portfolio cá nhân hiện đại, đồng thời có khả năng tiếp tục mở rộng trong các giai đoạn phát triển tiếp theo.