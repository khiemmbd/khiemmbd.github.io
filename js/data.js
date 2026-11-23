/* ==========================================================================
   DỮ LIỆU TRANG HOME — sửa ở đây, không cần đụng tới HTML/CSS.
   Thay ảnh: ghi đè file cùng tên trong /images (giữ đúng tỉ lệ ghi chú),
   hoặc đổi đường dẫn bên dưới sang link CDN.
   ========================================================================== */
window.CONFIG = {
  gameName: 'Ngự Kiếm',

  /* Trailer: link YouTube bất kỳ (watch?v=, youtu.be/, embed/) */
  trailer: 'https://www.youtube.com/watch?v=zdMVquLFYBM', // TODO: trailer của game (đang tạm dùng trailer DMAH)

  links: {
    home: '/',
    fanpage: 'https://facebook.com/',          // TODO: link fanpage
    group: 'https://facebook.com/groups/',     // TODO: link group cộng đồng
    zalo: 'https://zalo.me/',                  // TODO: link Zalo OA / nhóm
    login: '//pay.zoneplay.vn/dang-nhap?ref=back',
    register: 'https://id.zoneplay.vn/register', // TODO: kiểm tra link đăng ký
    payment: 'https://zoneplay.vn/payment',
    giftcode: '#',                             // TODO: trang nhận code
    ios: '#',                                  // TODO: App Store
    android: '#',                              // TODO: CH Play
    apk: '#',                                  // TODO: file APK / giả lập
    pc: '#',                                   // TODO: bản PC
    newsList: 'tin-tuc.html',                  // TODO: trang danh sách tin
  },

  /* Slider tin tức (ảnh 16:10, khuyến nghị 1200x750) */
  newsSlides: [
    { img: 'images/news/news-1.webp', link: '#', title: 'Đại lễ khai mở Tiên Giới' },
    { img: 'images/news/news-2.webp', link: '#', title: 'Phó bản Long Uyên ra mắt' },
    { img: 'images/news/news-3.webp', link: '#', title: 'Quà tặng tân thủ' },
  ],

  /* Danh sách tin. cat: news | event | guide  — TODO API */
  news: [
    { cat: 'event', title: 'Đại lễ khai mở máy chủ S1 – Thanh Vân', date: '20.11.2026', link: '#' },
    { cat: 'guide', title: 'Hướng dẫn ngự kiếm phi hành cho tân thủ', date: '19.11.2026', link: '#' },
    { cat: 'news',  title: 'Thông báo bảo trì cập nhật phiên bản 1.2', date: '18.11.2026', link: '#' },
    { cat: 'guide', title: 'Cẩm nang chọn môn phái phù hợp', date: '17.11.2026', link: '#' },
    { cat: 'event', title: 'Nạp lần đầu nhận ngay thần binh Thanh Long', date: '16.11.2026', link: '#' },
    { cat: 'news',  title: 'Ra mắt tính năng Bang Chiến liên server', date: '15.11.2026', link: '#' },
    { cat: 'guide', title: 'Hướng dẫn nhập Giftcode trong game', date: '14.11.2026', link: '#' },
    { cat: 'event', title: 'Đua top lực chiến – nhận danh hiệu Kiếm Tiên', date: '13.11.2026', link: '#' },
    { cat: 'news',  title: 'Lộ diện môn phái mới: Thiên Sơn', date: '12.11.2026', link: '#' },
  ],

  /* 4 ô danh mục (chỉ hiện trên mobile, theo FigJam) */
  newsCards: [
    { label: 'Tin Tức Mới Nhất',   cat: 'all',   img: 'images/sects/thienlong.webp' },
    { label: 'Sự Kiện Đặc Biệt',   cat: 'event', img: 'images/sects/ngami.webp' },
    { label: 'Cẩm Nang Hướng Dẫn', cat: 'guide', img: 'images/sects/vodang.webp' },
    { label: 'CSKH Hỗ Trợ',        link: 'https://id.zoneplay.vn/support', img: 'images/sects/thienson.webp' },
  ],

  /* 3 banner hướng dẫn + nhân vật (ảnh nhân vật nền trong suốt) */
  guides: [
    { line1: 'Hướng Dẫn', line2: 'Nạp Thẻ',    img: 'images/sects/ngami.webp',     link: '#' },
    { line1: 'Cẩm Nang',  line2: 'Tân Thủ',    img: 'images/sects/vodang.webp',    link: '#' },
    { line1: 'Hướng Dẫn', line2: 'Nhập Code',  img: 'images/sects/minhgiao.webp',  link: '#' },
  ],

  /* Môn phái: char = nhân vật (PNG/WebP trong suốt, 2:3), icon = huy hiệu vuông,
     preview = ảnh/clip kỹ năng trong khung điện thoại (16:9). video: link mp4 (tuỳ chọn) */
  sects: [
    { key: 'thienlong', name: 'Thiên Long', role: 'Cận chiến · Phật pháp', desc: 'Hoàng tộc Đại Lý tu Phật, lấy Nhất Dương Chỉ và Lục Mạch Thần Kiếm làm gốc. Công thủ cân bằng, giỏi khống chế và giải trừ trạng thái cho đồng đội.' },
    { key: 'vodang',    name: 'Võ Đang',    role: 'Kiếm khí · Nội công', desc: 'Đạo gia Võ Đang lấy nhu khắc cương. Thái Cực Kiếm liên miên bất tuyệt, sát thương nội công cao, ngự kiếm phi hành nhanh nhất giang hồ.' },
    { key: 'minhgiao',  name: 'Minh Giáo',  role: 'Bạo kích · Hỏa công', desc: 'Thánh hỏa Minh Giáo cháy mãi không tắt. Lấy Càn Khôn Đại Na Di làm tuyệt học, sát thương bùng nổ, chuyên xung phong mở đường trong bang chiến.' },
    { key: 'tinhtuc',   name: 'Tinh Túc',   role: 'Độc thuật · Duy trì', desc: 'Tinh Túc Hải lấy độc chế địch. Sát thương duy trì cực mạnh, giỏi làm suy yếu đối thủ, là cơn ác mộng trong các trận PK kéo dài.' },
    { key: 'thieulam',  name: 'Thiếu Lâm',  role: 'Chống chịu · Tank', desc: 'Thiên hạ võ công xuất Thiếu Lâm. Kim Cương Bất Hoại thân, phòng ngự số một, là bức tường thép bảo vệ cả đội trong phó bản.' },
    { key: 'caibang',   name: 'Cái Bang',   role: 'Liên hoàn · Cận chiến', desc: 'Vào thời Tống giang hồ loạn lạc, Uông Kiếm Thông đã hiệu lệnh ăn mày khắp chốn, lập Phân Đà, tôn Trưởng Lão, Đả Cẩu Bổng vung lên nhất hô bách ứng. Mấy mươi năm thiên hạ, Cái Bang như một đạo binh hùng mạnh khiến vương triều Tống – Liêu chấn động.' },
    { key: 'tieudao',   name: 'Tiêu Dao',   role: 'Pháp thuật · Diện rộng', desc: 'Tiêu Dao phái phiêu diêu tự tại, dùng tiêu sáo và trận pháp. Sát thương diện rộng, khống chế đám đông, toả sáng trong công thành chiến.' },
    { key: 'ngami',     name: 'Nga Mi',     role: 'Hồi phục · Hỗ trợ', desc: 'Nga Mi kiếm pháp thanh tú, y thuật cao siêu. Hồi máu và tăng cường cho đồng đội, là chỗ dựa không thể thiếu của mọi tổ đội.' },
    { key: 'thienson',  name: 'Thiên Sơn',  role: 'Ám sát · Tốc độ', desc: 'Linh Thứu Cung trên đỉnh Thiên Sơn, thân pháp như gió tuyết. Tàng hình áp sát, sát thương đơn mục tiêu cực cao, chuyên săn mục tiêu yếu.' },
  ].map(function (s, i) {
    // Mặc định ảnh theo key — ghi đè từng trường nếu cần
    return Object.assign({
      char: 'images/sects/' + s.key + '.webp',
      icon: 'images/sects/icon-' + s.key + '.webp',
      preview: 'images/gameplay/gp-' + ((i % 5) + 1) + '.webp',
      video: '',
    }, s);
  }),

  /* Bảng xếp hạng — TODO API: thay bằng dữ liệu thật trong loadRanking() ở main.js */
  servers: [
    { id: 's1', name: 'S1 - Thanh Vân' },
    { id: 's2', name: 'S2 - Côn Lôn' },
    { id: 's3', name: 'S3 - Phong Vân' },
  ],
  rankTypes: [
    { id: 'level', name: 'Top Cấp Độ', col: 'Level' },
    { id: 'power', name: 'Top Lực Chiến', col: 'Lực Chiến' },
    { id: 'guild', name: 'Top Bang Hội', col: 'Điểm' },
  ],

  /* Đặc sắc gameplay — 5 ảnh 16:9 (khuyến nghị 1600x900) */
  gameplay: [
    { img: 'images/gameplay/gp-1.webp', title: 'Ngự Kiếm Không Chiến' },
    { img: 'images/gameplay/gp-2.webp', title: 'Bang Chiến Liên Server' },
    { img: 'images/gameplay/gp-3.webp', title: 'Phó Bản Thần Thú' },
    { img: 'images/gameplay/gp-4.webp', title: 'Thú Cưỡi Linh Thú' },
    { img: 'images/gameplay/gp-5.webp', title: 'Gia Viên & Kết Duyên' },
  ],
};
