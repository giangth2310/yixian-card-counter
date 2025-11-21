# Công Cụ Đếm Bài YiXianPai

Ứng dụng hỗ trợ cho trò chơi YiXianPai (弈仙牌) giúp theo dõi lá bài trong trận đấu và quản lý bộ bài của bạn.

## Tính Năng

- **Theo Dõi Bài Thời Gian Thực**: Tự động giám sát log trò chơi và theo dõi việc sử dụng bài
- **Quản Lý Bộ Bài**: Xem số bài còn lại với nhiều tùy chọn lọc
- **Lịch Sử Trận Đấu**: Theo dõi kết quả trận đấu và thành tích của bạn qua các vòng
- **Thư Viện Bài**: Duyệt và quản lý các bài đang theo dõi theo môn phái, phó nghề và cảnh giới tu luyện
- **Cửa Sổ Nổi**: Cửa sổ phủ lên hiển thị thông tin bài quan trọng trong khi chơi (đang phát triển)

## Cài Đặt

1. Clone repository
2. Cài đặt dependencies: `npm install`
3. Chạy ở chế độ development: `npm run electron:dev` (hoặc `npm run mac:dev` trên macOS)
4. Build cho production: `npm run deploy`

## Hướng Dẫn Sử Dụng

### Bắt Đầu

1. **Khởi Động Ứng Dụng**: Chạy ứng dụng bằng `npm run mac:dev` (macOS) hoặc `npm run electron:dev` (Windows/Linux)
2. **Chạy Game YiXianPai**: Ứng dụng sẽ tự động phát hiện thư mục dữ liệu game:
   - **macOS**: `~/Library/Containers/com.darksun.yixianpai/` hoặc `~/Library/Application Support/com.darksun.yixianpai/`
   - **Windows**: `%USERPROFILE%\AppData\LocalLow\DarkSunStudio\YiXianPai`
3. **Vào Trận Đấu**: Khi bạn vào trận đấu, ứng dụng sẽ bắt đầu theo dõi tự động

### Giao Diện Chính

Ứng dụng có 3 tab chính ở phía dưới:

#### 1. Tab Lịch Sử Đấu

Đây là giao diện chính hiển thị thông tin trận đấu theo thời gian thực.

**Bảng Thông Tin Người Chơi** (Trên cùng):
- **Avatar & Tên**: Người chơi đang được chọn
- **Tu vi**: Cấp độ tu luyện hiện tại
- **HP tối đa**: Điểm sinh mệnh tối đa
- **Thể phách**: Chỉ số thể chất (dành cho nhân vật Đoán Huyền Tông)
- **Mệnh nguyên**: Điểm mệnh nguyên
- **Phó nghề**: Các phó nghề được phát hiện dựa trên bài đã dùng

**Phần Bài Đang Theo Dõi** (Giữa):
- Hiển thị các bài bạn đã đánh dấu theo dõi trong trận hiện tại
- Tab lọc: **Tất cả**, **Môn phái**, **Phó nghề**, **Cơ duyên**
- Nhấn nút **Theo dõi/Đang theo dõi** để thêm/xóa bài khỏi danh sách theo dõi
- Bài có nhãn "Đề xuất" là bài được gợi ý theo dõi

**Phần Lịch Sử Trận Đấu** (Dưới cùng):
- Liệt kê tất cả các vòng đấu trước đó theo thứ tự giảm dần
- Nhấn vào một vòng để mở rộng và xem chi tiết:
  - Số vòng, tu vi, HP, thay đổi mệnh nguyên
  - Tên đối thủ
  - Chỉ báo **Thắng/Thua**
  - Tất cả bài đã dùng trong vòng đó
- Nhấn nút **Theo dõi** trên bất kỳ bài nào để thêm vào danh sách theo dõi

#### 2. Tab Bộ Bài

Xem số bài còn lại trong bộ bài với nhiều tùy chọn lọc mạnh mẽ.

**Bộ Lọc**:

*Hàng 1 - Chọn Môn Phái*:
- **Vân Linh Kiếm Tông / Thất Tinh Các / Ngũ Hành Đạo Minh / Đoán Huyền Tông**: Chọn môn phái
- **Chỉ hiện bài môn phái**: Chỉ hiển thị bài môn phái (ẩn phó nghề)

*Hàng 2 - Chọn Phó Nghề*:
- **Luyện đan sư / Phù chú sư / Cầm sư / Họa sư / Trận pháp sư / Linh thực sư / Mệnh lý sư**
- **Chọn nhiều**: Bật để chọn nhiều phó nghề cùng lúc
- **Chỉ hiện bài phó nghề**: Chỉ hiển thị bài phó nghề (ẩn môn phái)

*Hàng 3 - Cảnh Giới Tu Luyện*:
- **Tất cả / Luyện khí / Trúc Cơ / Kim Đan / Nguyên Anh / Hóa Thần**
- **Chọn nhiều**: Bật để chọn nhiều cảnh giới

*Hàng 4 - Tùy Chọn Hiển Thị*:
- **Ẩn bài hết**: Không hiển thị bài có 0 lá còn lại
- **Chỉ hiện bài ≤1**: Chỉ hiển thị bài có số lượng thấp quan trọng
- **Chỉ hiện bài đang theo dõi**: Lọc để chỉ hiển thị bài bạn đang theo dõi

**Hiển Thị Bài**:
- Mỗi bài hiển thị **tên** và **số lượng còn lại**
- Số lượng còn lại được tính: `Số lượng tối đa - Số đã dùng`
- **Quy tắc kích thước bộ bài**:
  - Hầu hết các bài: 8 lá mỗi bộ
  - Bài Hóa Thần (Cảnh giới 5): 6 lá
  - Đan dược đặc biệt (锻体丹, 还魂丹, 锻体玄丹): 4 lá

#### 3. Tab Quản Lý Theo Dõi

Cấu hình bài nào sẽ theo dõi cho các mục đích khác nhau.

**Chọn Chế Độ Theo Dõi**:
- **Trận đấu**: Bài theo dõi trong lịch sử trận đấu
- **Bộ bài**: Bài theo dõi trong giao diện bộ bài

**Bộ Lọc Loại Bài**:
- **Môn phái / Phó nghề / Cơ duyên / Cá nhân**: Chọn danh mục bài

**Bộ Lọc Phân Loại**:
- Thay đổi dựa trên loại bài được chọn
- **Môn phái**: Chọn môn phái của bạn
- **Phó nghề**: Chọn phó nghề của bạn
- **Cơ duyên**: Pháp bảo, Linh sủng, hoặc Bí thuật theo môn phái
- **Cá nhân**: Bài đặc biệt của nhân vật theo môn phái

**Bộ Lọc Cảnh Giới**:
- Lọc theo cảnh giới tu luyện (bao gồm Phản Hư cho bài cơ duyên)

**Lưới Bài**:
- Duyệt tất cả bài phù hợp với bộ lọc của bạn
- Nhấn nút **Theo dõi/Đang theo dõi** để bật/tắt theo dõi
- Bài được đánh dấu "Đề xuất" là bài được gợi ý theo dõi
- Bài đã theo dõi sẽ xuất hiện trong giao diện theo dõi tương ứng

### Mẹo & Thực Hành Tốt

1. **Bắt Đầu Theo Dõi Sớm**: Thêm bài vào theo dõi trước khi chúng trở nên quan trọng
2. **Sử Dụng "Chỉ hiện bài ≤1"**: Tập trung vào các bài gần hết
3. **Theo Dõi Bài Quan Trọng**: Tập trung vào các bài có ảnh hưởng lớn như tấn công mạnh hoặc đan dược quan trọng
4. **Chọn Nhiều Cảnh Giới**: Theo dõi nhiều cảnh giới nếu bạn đang trong trận dài
5. **Kiểm Tra Lịch Sử Trận Đấu**: Xem lại các vòng trước để hiểu chiến lược của đối thủ

### Khắc Phục Sự Cố

**Thông báo "Đang chờ dữ liệu trận đấu..."**:
- Đảm bảo YiXianPai đang chạy
- Đảm bảo bạn đang trong trận đấu (không phải menu chính)
- Kiểm tra file dữ liệu game tồn tại ở vị trí đúng

**Bài không cập nhật**:
- Ứng dụng poll log game mỗi 1 giây
- Đảm bảo YiXianPai có quyền ghi vào thư mục dữ liệu

**Ứng dụng không phát hiện game**:
- Xác minh game được cài đặt ở vị trí chuẩn
- Kiểm tra `BattleLog.json` tồn tại trong thư mục dữ liệu game

## Tính Năng Sắp Tới (theo độ ưu tiên)

- ~~Chỉ hiển thị bài có số lượng < 1 trong giao diện bộ bài~~ ✅
- ~~Chỉ hiển thị bài phó nghề~~ ✅
- ~~Chọn nhiều phó nghề~~ ✅
- ~~Chỉ hiển thị bài môn phái~~ ✅
- Cửa sổ nổi phủ lên game (đang phát triển)
    - Điều phối click phía client
    - Hiển thị bài còn lại
    - Theo dõi lịch sử trận đấu
    - Làm nổi bật bài số lượng thấp
- Điều chỉnh số lượng bài thủ công
- Áp dụng một cú nhấp các bài theo dõi được đề xuất
- Cấu hình theo dõi bài riêng cho từng nhân vật

## Vấn Đề Đã Biết

- Chỉ số thể phách không hiển thị cho nhân vật môn phái Đoán Huyền Tông (đang sửa)
- Hỗ trợ Mac chip Intel (đã giải quyết tạm thời dựa trên phản hồi người dùng)
- Làm mới trận đấu ảnh hưởng đến số lượng bộ bài
- Mất kết nối mạng ảnh hưởng đến ghi dữ liệu

## Phát Triển

Được xây dựng với:
- React + TypeScript
- Electron
- Chokidar (theo dõi file)
- node-window-manager (cửa sổ phủ)
