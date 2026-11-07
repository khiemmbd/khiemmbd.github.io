/* Mỹ Nữ Onsen – Trang Chủ: DỮ LIỆU CẤU HÌNH
   Sửa link, banner, tin tức, server, danh sách tướng tại đây.
   Chỗ nào ghi "TODO API" là đang dùng dữ liệu mẫu – thay bằng API thật khi có. */
var CONFIG = {
  // link thật – để '#' thì bấm sẽ hiện "Đang cập nhật"
  links: {
    landing: 'https://mnos.zoneplay.vn/landing-dks-1', // nút Đăng Ký Sớm trong popup
    group: 'https://www.facebook.com/groups/mynuonsen/',
    fanpage: 'https://www.facebook.com/mynuonsen.gzone',
    topup: 'https://zoneplay.vn/payment',              // nút Nạp (thanh bên)
    appStore: '#',   // chờ link tải
    googlePlay: '#', // chờ link tải
    apk: '#',        // chờ link tải
    download: '#',   // ô "Tải Game Ngay" (chờ link + mã QR)
    about: 'https://gzone.vn',
    terms: 'http://gzone.vn/rules',
    account: 'https://id.zoneplay.vn',
    support: 'https://id.zoneplay.vn/support'
  },
  qrImage: '',                 // ảnh mã QR tải game, vd 'publics/images/qr.png' – có ảnh thì hiện trong ô "Tải Game Ngay"
  heroVideo: 'publics/video/hero.mp4', // video nền trang 1 – nút âm thanh bật/tắt tiếng
  trailer: '',                 // link nhúng YouTube trailer, vd 'https://www.youtube.com/embed/xxxx'

  // banner slide trang 1 – ảnh 1192×612 (tỉ lệ 596×306), link: bấm vào mở trang
  banners: [
    { img: 'publics/images/banner-1.webp', link: '#' },
    { img: 'publics/images/banner-1.webp', link: '#' },
    { img: 'publics/images/banner-1.webp', link: '#' }
  ],
  bannerInterval: 2000, // 1–2 giây đổi 1 lần

  // quà Đăng Nhập 8 Ngày (trang 2) – on: vòng cam (đã mở), img: ảnh quà, item: 'heart' = icon LR Heart Captor
  login8: [
    { day: 'Ngày 01', name: 'Vé Quay*10', img: 'publics/images/sk/it-ve-quay.png', on: true },
    { day: 'Ngày 02', name: 'LR Heart Captor', item: 'heart', on: true },
    { day: 'Ngày 03', name: 'Vé Quay*10', img: 'publics/images/sk/it-ve-quay.png', on: true },
    { day: 'Ngày 04', name: 'Trang Bị Đỏ Ngẫu Nhiên', img: 'publics/images/sk/it-trang-bi.png' },
    { day: 'Ngày 05', name: 'Kim Cương*1688', img: 'publics/images/sk/it-kim-cuong.png' },
    { day: 'Ngày 06', name: 'Vé Quay Cao Cấp*1', img: 'publics/images/sk/it-ve-cao-cap.png' },
    { day: 'Ngày 07', name: 'Kim Cương*2888', img: 'publics/images/sk/it-kim-cuong.png' },
    { day: 'Ngày 08', name: 'Rương Tự Chọn Waifu Quang/ Ám', img: 'publics/images/sk/it-ruong.png' }
  ],

  // banner sự kiện trái trang 2 – ảnh 954×1310 (tỉ lệ 477×655)
  events: [
    { img: 'publics/images/ev-1.webp', link: '#' },
    { img: 'publics/images/ev-1.webp', link: '#' }
  ],
  eventInterval: 2000,

  // bảng xếp hạng – rankApi rỗng thì hiện Coming Soon
  rankApi: '', // TODO API: vd '/api/rank?type={type}&server={server}' trả [{name, server, value}]
  servers: ['S1 - Onsen Hoa Anh Đào'],

  // banner "Đặc Sắc Mỹ Nữ Onsen" – ảnh 768×1450 (tỉ lệ 384×725)
  gallery: [
    { img: 'publics/images/gallery-1.webp', link: '#' },
    { img: 'publics/images/gallery-1.webp', link: '#' },
    { img: 'publics/images/gallery-1.webp', link: '#' }
  ],
  galleryInterval: 5000,

  // hệ: desc = mô tả hệ, sign = dòng chức năng mặc định
  elements: [
    { id: 'moc', name: 'Hệ Mộc', color: '#47b18c', desc: 'Dịu dàng tựa hoa, mạnh mẽ tựa rừng.\nNhững linh hồn mang sức sống bất tận,\nđồng hành cùng bạn qua vạn dặm.', sign: 'SINH MỆNH • CHỞ CHE • TÁI SINH' },
    { id: 'hoa', name: 'Hệ Hỏa', color: '#ed2f2f', desc: 'Dịu dàng tựa hoa, mạnh mẽ tựa rừng.\nNhững linh hồn mang sức sống bất tận,\nđồng hành cùng bạn qua vạn dặm.', sign: 'SINH MỆNH • CHỞ CHE • TÁI SINH' },
    { id: 'thuy', name: 'Hệ Thủy', color: '#405992', desc: 'Dịu dàng tựa hoa, mạnh mẽ tựa rừng.\nNhững linh hồn mang sức sống bất tận,\nđồng hành cùng bạn qua vạn dặm.', sign: 'SINH MỆNH • CHỞ CHE • TÁI SINH' },
    { id: 'am', name: 'Hệ Ám', color: '#322251', desc: 'Dịu dàng tựa hoa, mạnh mẽ tựa rừng.\nNhững linh hồn mang sức sống bất tận,\nđồng hành cùng bạn qua vạn dặm.', sign: 'SINH MỆNH • CHỞ CHE • TÁI SINH' },
    { id: 'quang', name: 'Hệ Quang', color: '#c79610', desc: 'Dịu dàng tựa hoa, mạnh mẽ tựa rừng.\nNhững linh hồn mang sức sống bất tận,\nđồng hành cùng bạn qua vạn dặm.', sign: 'SINH MỆNH • CHỞ CHE • TÁI SINH' }
  ],

  // phẩm chất (thứ tự nút lọc). Tướng phẩm HR chỉ hiện ở "All" vì thiết kế chưa có nút HR.
  rarities: ['gr', 'lr', 'ur', 'ssr', 'sr', 'r']
};

/* Danh sách tướng (sheet "[Home] List Tướng Trang 4" đang trống – điền thêm voice/quote/role khi có):
   [ảnh trong publics/images/cards, tên, hệ, phẩm, voice (mp3), lời thoại, chức năng] */
var HEROES = [
  ['01', 'Heart Captor', 'quang', 'lr'],
  ['02', 'Lady Hachisaku', 'quang', 'lr'],
  ['03', 'Battle Bride', 'quang', 'gr'],
  ['04', 'Fairytale Fairy', 'quang', 'gr'],
  ['05', 'Rose Dagger', 'quang', 'gr'],
  ['06', 'Sweet Mask', 'quang', 'gr'],
  ['07', 'Weeping Knight', 'quang', 'gr'],
  ['08', 'Baseball Champ', 'am', 'gr'],
  ['09', 'Mimic Girl', 'am', 'gr'],
  ['10', 'Wedged Witch', 'am', 'gr'],
  ['11', 'Bunny Reaper', 'am', 'lr'],
  ['12', 'Clumsy Mage', 'am', 'lr'],
  ['13', 'Honey Succubus', 'am', 'lr'],
  ['14', 'Mecha Angel', 'am', 'lr'],
  ['15', 'Stoic Steward', 'am', 'lr'],
  ['16', 'Nasty Blade', 'hoa', 'lr'],
  ['17', 'Doll Maide', 'hoa', 'gr'],
  ['18', 'Vu Nữ Vũ Trang', 'hoa', 'lr'],
  ['19', 'Rose-Knight', 'hoa', 'lr'],
  ['20', 'Rose-Knight', 'hoa', 'hr'],
  ['21', 'Red Hood', 'hoa', 'r'],
  ['22', 'Blushroom', 'hoa', 'sr'],
  ['23', 'Vampire Nurse', 'hoa', 'sr'],
  ['24', 'Flytrap', 'hoa', 'ssr'],
  ['25', 'Pyro Mistress', 'hoa', 'ssr'],
  ['26', 'Loliblade', 'hoa', 'ur'],
  ['27', 'Orchid Mantis', 'hoa', 'ur'],
  ['28', 'Elf Princess', 'moc', 'gr'],
  ['29', 'Miss Tsundere', 'moc', 'gr'],
  ['30', 'Klutz Ghost', 'moc', 'lr'],
  ['31', 'Seraph', 'moc', 'lr'],
  ['32', 'Tomboy Fighter', 'moc', 'lr'],
  ['33', 'Papilio', 'moc', 'hr'],
  ['34', 'Tender Scion', 'moc', 'r'],
  ['35', 'Kuchisake', 'moc', 'sr'],
  ['36', 'Lotus Dancer', 'moc', 'sr'],
  ['37', 'Shy Diva', 'moc', 'ssr'],
  ['38', 'Ailing Maiden', 'moc', 'ur'],
  ['39', 'Airy Fairy', 'moc', 'ur'],
  ['40', 'Edge Shadow', 'moc', 'ur'],
  ['41', 'Dark Snow', 'thuy', 'gr'],
  ['42', 'Beggar Girl', 'thuy', 'lr'],
  ['43', 'Duchess M', 'thuy', 'lr'],
  ['44', 'Fluffy Neko', 'thuy', 'lr'],
  ['45', 'Queen Otaku', 'thuy', 'lr'],
  ['46', 'Abyssal Jelly', 'thuy', 'hr'],
  ['47', 'Naughty Slime', 'thuy', 'r'],
  ['48', 'Polly Witch', 'thuy', 'sr'],
  ['49', 'Tiểu Ác Ma Khiêu Khích', 'thuy', 'sr'],
  ['50', 'Cute Samurai', 'thuy', 'ssr'],
  ['51', 'Dorky Sadako', 'thuy', 'ssr'],
  ['52', 'Brute Oni', 'thuy', 'ur'],
  ['53', 'Virgin Slime(1)', 'thuy', 'ur']
];

/* Tin tức – TODO API: thay bằng dữ liệu thật. cat: tin-tuc | su-kien | huong-dan; content: HTML */
var NEWS = [
  { id: 'khai-mo-thien-duyen-hoi-ngo', cat: 'tin-tuc', title: 'Khai mở phiên bản Thiên Duyên Hội Ngộ', date: '13.10.2026',
    content: '<p><b>(Nội dung mẫu – thay bằng bài thật)</b> Phiên bản Thiên Duyên Hội Ngộ chính thức khai mở, mang đến nhiều mỹ nữ mới cùng chuỗi sự kiện hấp dẫn dành cho các Chủ Nhân.</p>' +
      '<h2>Thời gian</h2><p>Từ 10:00 ngày 13/10/2026 đến 23:59 ngày 27/10/2026.</p>' +
      '<h2>Nội dung nổi bật</h2><ul><li>Ra mắt mỹ nữ mới.</li><li>Sự kiện Đăng Nhập 8 Ngày nhận LR Heart Captor.</li><li>Ưu đãi nạp đầu nhận GR Rose Dagger.</li></ul>' +
      '<p><img src="publics/images/banner-1.webp" alt="Thiên Duyên Hội Ngộ"></p>' +
      '<p>Chúc các Chủ Nhân có những phút giây thư giãn tại Mỹ Nữ Onsen!</p>' },
  { id: 'dang-nhap-7-ngay', cat: 'su-kien', title: 'Đăng nhập 7 ngày, nhận tiên hữu SSR', date: '12.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-son', cat: 'tin-tuc', title: 'phá bí cảnh Vân Sơn mới', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-son1', cat: 'tin-tuc', title: 'bí cảnh Vân Sơn mới', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-so2n', cat: 'tin-tuc', title: 'cảnh Vân Sơn mới', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-son3', cat: 'tin-tuc', title: 'Vân Sơn mới', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-son4', cat: 'tin-tuc', title: 'Sơn mới', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-son5', cat: 'tin-tuc', title: 'Khám phá', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-so6n', cat: 'tin-tuc', title: 'Khám phá bí ', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-so8n', cat: 'tin-tuc', title: 'Khám phá bí cảnh', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'bi-canh-van-s7on', cat: 'tin-tuc', title: 'Khám phá bí cảnh Vân ', date: '11.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' },
  { id: 'cam-nang-tan-thu', cat: 'huong-dan', title: 'Cẩm nang khởi hành dành cho tân thủ', date: '10.10.2026', content: '<p>Nội dung bài viết đang được cập nhật.</p>' }
];

var NEWS_CATS = { 'tin-tuc': 'Tin Tức', 'su-kien': 'Sự Kiện', 'huong-dan': 'Hướng Dẫn' };
