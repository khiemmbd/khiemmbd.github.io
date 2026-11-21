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
  trailer: 'https://www.youtube.com/embed/wApvWPyyoOE', // link nhúng YouTube trailer

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

  // bảng xếp hạng – rankApi rỗng thì hiện Coming Soon (trừ khi có rankDemo bên dưới)
  rankApi: '', // TODO API: vd '/api/rank?type={type}&server={server}' trả [{name, server, value}]
  servers: ['S1 - Onsen Hoa Anh Đào', 'S2 - Suối Ngọc Bồng Lai', 'S3 - Lâu Trúc Nguyệt Ảnh'],
  // DỮ LIỆU MẪU BXH (hiện khi chưa có API): rankDemo.loại.server = mảng [tên nhân vật, điểm] đã sắp theo hạng.
  // Xóa rankDemo (hoặc set '') để trở lại màn hình Coming Soon.
  rankDemo: {
    power: {
      'S1 - Onsen Hoa Anh Đào': [
        ['Vũ Đế Bạch Long', 98654321], ['Kiếm Tiên Đễ', 91203456], ['Hắc Y Nhân', 88450112],
        ['Mộng Dao', 76980530], ['Tuyết Sơn Phi Hồ', 71254980], ['Vô Ưu Cốc Chủ', 65430201],
        ['Thập Lý Đào Hoa', 59876440], ['Lam Y Hiệp', 52110987], ['Bạch Y Sứ Giả', 47552310],
        ['Nguyệt Ảnh Lưu Quang', 41096758], ['Hàn Băng Kiếm Khách', 35678204], ['Tiểu Long Nữ', 29845672]
      ],
      'S2 - Suối Ngọc Bồng Lai': [
        ['Hàn Thiên Khởi', 97120456], ['Cuồng Đao Thiên Hạ', 89554230], ['Bích Hải Triều Sinh', 82310675],
        ['Vân Thượng Tiên', 74986021], ['Kiếm Vô Trần', 68452310], ['Mặc Vũ Phong Hoa', 61098554],
        ['Trúc Mã Thanh Mai', 55760988], ['Đêm Trăng Cô Ảnh', 49231506], ['Tà Long Chiến Thần', 43876220],
        ['Bồ Công Anh Bay', 37654801], ['Gió Nhặt Mây Trôi', 31209466], ['Võ Lăng Tĩnh Mộng', 25432190]
      ],
      'S3 - Lâu Trúc Nguyệt Ảnh': [
        ['Long Vương Khoái Đấu', 95432100], ['Kiếm Quỷ Vô Danh', 88765432], ['Ánh Trăng Bên Đêm', 81209887],
        ['Thủy Thủ Vô Địch', 73554690], ['Kẹo Bông Đi Chiến', 66098340], ['Mèo Hoang Già Cỗi', 59876221],
        ['Phong Lưu Tài Tử', 53432875], ['Tang Thi Lười Cười', 47098650], ['Cô Đơn Vô Đối', 40554908],
        ['Mưa Rơi Bên Cửa', 34098234], ['Say Rượu Ngâm Vườn', 28765540], ['Ngủ Quên Trên Mây', 21098776]
      ]
    },
    wealth: {
      'S1 - Onsen Hoa Anh Đào': [
        ['Phú Già Thiên Hạ', 88888888], ['Kim Ngân Điện Chủ', 75432109], ['Muội Muội Có Tiền', 69120456],
        ['Đại Gia Vô Danh', 58765432], ['Trùm Sở Hữu', 51098776], ['Tu Tiên Vạn Tuế', 46552301],
        ['Lụa Là Vàng Bạc', 39874500], ['Núi Vàng Biển Bạc', 33210888], ['Tiểu Thư Phủ Điền', 27654990],
        ['Vương Tử Lạc Nước', 22098554], ['Hoàng Thượng Vắng Nhà', 17433201], ['Bán Hoa Cô Nương', 12876435]
      ],
      'S2 - Suối Ngọc Bồng Lai': [
        ['Thần Tài Nhà Bên', 92456780], ['Kho Vàng Không Khóa', 80331224], ['Sa Hoa Có Phúc', 71554902],
        ['Cưng Chiều Vô Độ', 64098335], ['Buôn Dâu Bán Tơ', 57876410], ['Túi Mỏi Vẫn Tiền', 50120876],
        ['Quý Cô Tiểu Thư', 44655390], ['Đế Vương Có Tiền', 38098765], ['Công Chúa Mất Ví', 31220455],
        ['Phú Ông Trộm Cá', 26765120], ['Mãi Mãi Không Giàu', 19876340], ['Đồng Xu Đôi Của Tôi', 14530860]
      ],
      'S3 - Lâu Trúc Nguyệt Ảnh': [
        ['Ngân Hà Chủ Tịch', 90120554], ['Sếp Chú Em Lo', 78654320], ['Vua Bán Kem', 70098456],
        ['Tỷ Phú Đường Quê', 62554780], ['Cửa Hàng Vạn Vật', 55098230], ['Hột Vị Trà Tiền', 48765670],
        ['Nàng Tiên Ưu Tú', 42098340], ['Bán Giày Trôi Kẻ', 35554120], ['Mèo Giàu Có Nhất', 29098655],
        ['Cá Kho Tiểu Khôi', 23456780], ['Trộm Vàng Đêm Trăng', 18098340], ['Ví Tiền Của Ai', 13220980]
      ]
    }
  },

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

/* Danh sách tướng – voice/quote/role lấy từ sheet "[Home] List Tướng Trang 4" (Google Docs).
   voice: bấm thẻ tướng sẽ phát voice + hiện quote (sub thoại) và role (chức nghiệp).
   Voice dùng file local trong publics/voice/ – voice N.mp3 ứng với tướng hàng N trong sheet.
   4 tướng chưa có trong sheet (Bunny Reaper, Rose-Knight HR, Papilio, Abyssal Jelly) để trống. */
var HEROES = [
  ['01', 'Heart Captor', 'quang', 'lr', 'publics/voice/48.mp3', 'Ư… ưm… Chủ Nhân ơi… Chủ Nhân ơi… Chủ Nhân ơi!… Chủ Nhân ơi!… Em… không… chịu nổi nữa rồi……', 'Hiệu Ứng Có Lợi Trị Liệu'],
  ['02', 'Lady Hachisaku', 'quang', 'lr', 'publics/voice/49.mp3', 'Ưm… ưm… chị cảm nhận được sự mong đợi của nhóc rồi đấy… Dù chị thấy thân hình mình hiện tại đã đủ chuẩn rồi, nhưng để trở thành người vợ lý tưởng trong mơ của nhóc, chị sẽ còn phát triển hơn nữa cho xem~♥', 'Bạo Phát ST Quần Thể'],
  ['03', 'Battle Bride', 'quang', 'gr', 'publics/voice/43.mp3', 'Ưm… ư… tự nhiên thấy nóng lên dần rồi. Không biết chuyện này có liên quan gì đến anh không nhỉ?', 'Coming Soon'],
  ['04', 'Fairytale Fairy', 'quang', 'gr', 'publics/voice/44.mp3', 'Cảm giác này… Ồ! Yeah!… Ôi trời… không chịu nổi nữa rồi… cuối cùng mình cũng đã gặp được định mệnh đời mình rồi!', 'Coming Soon'],
  ['05', 'Rose Dagger', 'quang', 'gr', 'publics/voice/45.mp3', 'Ư… hộc… thưa Chủ Nhân, luồng nhiệt đang lan tỏa khắp cơ thể tôi… xin hãy tha thứ cho dáng vẻ dâm loạn này của tôi…', 'Bạo Phát Đơn Điểm'],
  ['06', 'Sweet Mask', 'quang', 'gr', 'publics/voice/46.mp3', 'Haa! Ưư... Phước lành này... mãnh liệt quá... nóng rực! Nhưng vì tình yêu và hòa bình, mình nhất định sẽ chịu đựng được!', 'Coming Soon'],
  ['07', 'Weeping Knight', 'quang', 'gr', 'publics/voice/47.mp3', 'Senpai!? Đây là hơi ấm mà Senpai dành cho em sao!? Cơ thể em thấy ấm áp quá... Quả nhiên Senpai là tuyệt nhất!!', 'Coming Soon'],
  ['08', 'Baseball Champ', 'am', 'gr', 'publics/voice/36.mp3', 'Ưm… cảm giác sức mạnh tràn ngập khắp cơ thể này, cứ như thể vừa mới khởi động xong vậy.', 'Coming Soon'],
  ['09', 'Mimic Girl', 'am', 'gr', 'publics/voice/37.mp3', 'Ư…! Có vẻ như Rương Báu vẫn còn đói… Những đồng vàng bên trong cơ thể đang nóng rực lên… Ha… Ước gì có thể nuốt cả Chủ Nhân vào… rồi hòa tan người ấy trong sự ấm áp này…', 'Coming Soon'],
  ['10', 'Wedged Witch', 'am', 'gr', 'publics/voice/38.mp3', 'Chủ Nhân! Sao phía sau lưng lại nóng lên thế này? Lại có phép thuật nào đó mất kiểm soát nữa à...?', 'Coming Soon'],
  ['11', 'Bunny Reaper', 'am', 'lr'],
  ['12', 'Clumsy Mage', 'am', 'lr', 'publics/voice/39.mp3', 'Ư… Có thứ gì đó như sắp trào ra từ bên trong cơ thể mình vậy… ha…! Trong đầu mình, một bóng đèn vừa “tách” một cái rồi sáng bừng lên! Chẳng lẽ… mình lại càng trở nên thiên tài hơn rồi sao?', 'Giảm Trị Liệu Ma Lực'],
  ['13', 'Honey Succubus', 'am', 'lr', 'publics/voice/40.mp3', 'Cơ thể mình… nóng quá! Làm mát đi… nhanh lên! Chủ Nhân ơi… khó chịu quá… cảm giác lạ lắm… ư… ha…', 'Hiệu Ứng Có Lợi Trị Liệu'],
  ['14', 'Mecha Angel', 'am', 'lr', 'publics/voice/41.mp3', 'Ư…! Cơ thể mình tê dại hết cả… nhưng mà… sức mạnh… đang trào dâng… Haizz… thế này thì anh trai lại càng trở nên vô dụng hơn rồi nhỉ~♥', 'Bảo Vệ Khỏi Độc'],
  ['15', 'Stoic Steward', 'am', 'lr', 'publics/voice/42.mp3', 'Ư… ha… Chủ Nhân biến thái, Ngài đã trộn thứ gì kỳ lạ vào phần thưởng đó sao? Cơ thể tôi… nóng quá……', 'ST Ma Lực Quần Thể'],
  ['16', 'Nasty Blade', 'hoa', 'lr', 'publics/voice/15.mp3', 'Ưm… ư… không ngờ lại giúp em trưởng thành bằng cách đầy kích thích thế này… Chủ Nhân ơi… anh lỡ thích em rồi phải không? Nói rõ ra đi nào~!', 'ST Đơn Thiêu Đốt'],
  ['17', 'Doll Maiden', 'hoa', 'gr', 'publics/voice/13.mp3', 'Tuyệt quá, tuyệt quá! Cả người nóng bừng, mồ hôi nhễ nhại, cảm giác sảng khoái vô cùng! Em yêu Chủ Nhân nhất!', 'Bùng Nổ Quần Thể'],
  ['18', 'Armed Miko', 'hoa', 'lr', 'publics/voice/14.mp3', 'Ưm… ư… thật kích thích, nóng bỏng quá… Chủ Nhân ơi, món quà này… là dành cho em sao…? Em yêu anh lắm!', 'Bảo Vệ Khiêu Khích'],
  ['19', 'Rose-Knight', 'hoa', 'lr', 'publics/voice/16.mp3', 'Ư… ha… Chủ Nhân, sao toàn thân em lại nóng ran thế này… Có phải em đã làm điều gì sai không ạ?', 'Bạo Kích Thiêu Đốt'],
  ['20', 'Rose-Knight', 'hoa', 'hr'],
  ['21', 'Red Hood', 'hoa', 'r', 'publics/voice/23.mp3', 'Ái chà chà! Tha hồ mà nghịch nước nhé! Chủ Nhân ơi, quấn khăn tắm rồi vào đây cùng em luôn đi! Chuyến đi suối nước nóng lần này, đảm bảo Ngài sẽ không bao giờ phải hối hận đâu! Nào, lại đây, lại đây với em~ Yêu Ngài lắm, Chủ Nhân đáng yêu ơi!', 'Công Vật Lý Đơn Thể'],
  ['22', 'Blushroom', 'hoa', 'sr', 'publics/voice/21.mp3', 'Chủ Nhân... Ngài nhìn chằm chằm như vậy thì làm sao em có thể vượt qua sự xấu hổ được chứ... V-vâng, em hiểu rồi, em sẽ cố gắng!', 'Kháng Thiêu Đốt'],
  ['23', 'Vampire Nurse', 'hoa', 'sr', 'publics/voice/22.mp3', 'Ư... a... người mình nóng quá! Là do loại thuốc kích tình mà Chủ Nhân đã bỏ vào sao? Nếu vậy thì... nhân cơ hội này, mình sẽ đè ngửa người đó ra luôn!', 'Thưởng ST Thiêu Đốt'],
  ['24', 'Flytrap', 'hoa', 'ssr', 'publics/voice/19.mp3', 'Suối nước nóng thì hơi... cũ kỹ, nhưng thỉnh thoảng đổi gió thế này cũng chẳng tệ nhỉ. ...Sao, không định vào à? Thế còn cái này thì sao?... Thấy sao nào? Nếu chịu vào đây, còn nhiều trò vui hơn đang chờ em đấy~♥', 'Tăng ST và Hồi HP'],
  ['25', 'Pyro Mistress', 'hoa', 'ssr', 'publics/voice/20.mp3', 'Cho phép ngươi được phục vụ ta trong lúc ta tắm rửa. Nếu làm tốt, ta có thể ban cho ngươi chút phần thưởng... Đây là phần thưởng ứng trước đấy. Còn phần còn lại... cứ tùy ý mà tưởng tượng đi.', 'Thiêu Đốt và Giảm Thủ'],
  ['26', 'Loliblade', 'hoa', 'ur', 'publics/voice/17.mp3', 'Anh ơi, nhanh lên nào! Là hồ bơi nước nóng đấy! Thích lắm luôn! À, đúng rồi! Chơi tạt nước đi, trò mà trước giờ mình chưa chơi được ấy! Hì hì... chuẩn bị xong chưa? Này thì... tạt nè!', 'Thiêu Đốt HP Thấp'],
  ['27', 'Orchid Mantis', 'hoa', 'ur', 'publics/voice/18.mp3', 'Kích thích… đang tràn vào cơ thể… ư… tựa như dòng điện vậy… mạnh quá… không được… đầu óc… trống rỗng hết cả… á…', 'Hồi Phục Thiêu Đốt'],
  ['28', 'Elf Princess', 'moc', 'gr', 'publics/voice/1.mp3', 'A hư hư hư hư! Cuối cùng thì anh cũng chịu nghe lời em, rồi dành tặng cho em một phần thưởng đầy kích thích thế này đây! Ưm...! Hự...! A...', 'Coming Soon'],
  ['29', 'Miss Tsundere', 'moc', 'gr', 'publics/voice/2.mp3', 'Ư…! Ư…! Haa…! Kiểu kích thích thế này… chắc chỉ có tên đầy tớ biến thái, đầu óc lúc nào cũng chứa đầy những tưởng tượng đồi trụy như ngươi mới nghĩ ra được thôi! Cứ thử xem nào! Ta sẽ không thua đâu!', 'Phản Công Hộ Vệ'],
  ['30', 'Klutz Ghost', 'moc', 'lr', 'publics/voice/3.mp3', 'Cơ thể… nóng quá… lâng lâng… á… mình sắp bay mất rồi… Á! Senpai, g-giữ mình lại với! Hộc… may quá… cứu được rồi…', 'Bạo Phát ST Quần Thể'],
  ['31', 'Seraph', 'moc', 'lr', 'publics/voice/4.mp3', 'Ư… sức mạnh của Ngài… thấm sâu vào tận bên trong cơ thể tôi… dường như sắp trào ra rồi… Haa… hãy lấp đầy toàn bộ con người tôi bằng hơi nóng của Ngài đi…', 'Khiên Quần Thể'],
  ['32', 'Tomboy Fighter', 'moc', 'lr', 'publics/voice/5.mp3', 'Ưm! Ưm! Haa… cậu mát-xa đỉnh thật đấy, cộng sự ơi! Dù có mệt mỏi đến đâu đi nữa, một luồng nhiệt nóng hổi cũng trào dâng mạnh mẽ, khiến cơ thể tớ lại nóng bừng lên rồi!', 'Điểm Sát Hàng Sau'],
  ['33', 'Papilio', 'moc', 'hr'],
  ['34', 'Tender Scion', 'moc', 'r', 'publics/voice/12.mp3', 'Ưm... ấm áp quá... cảm giác như cơ thể mình sắp tan chảy ra vậy... Chủ Nhân cũng thấy dễ chịu chứ ạ? Vâng, tốt quá rồi... Chỉ cần ngâm mình trong suối nước ấm này thôi, sức mạnh để bảo vệ Chủ Nhân lại càng trào dâng trong tôi. Từ nay về sau, hãy cứ dựa dẫm vào tôi nhiều hơn nữa nhé.', 'Bạo Phát Đơn Điểm'],
  ['35', 'Kuchisake', 'moc', 'sr', 'publics/voice/10.mp3', 'Sức mạnh này… ư…! Máu trong toàn thân ta như đang sôi lên vậy… hộc…! Chỉ cần để bảo vệ Chủ Nhân… ta sẵn sàng dâng hiến tất cả, dù có phải biến thành một con quái vật thực thụ đi chăng nữa…', 'Khiên và Giảm Công'],
  ['36', 'Lotus Dancer', 'moc', 'sr', 'publics/voice/11.mp3', 'Sau màn múa, được tận hưởng suối nước nóng của Chủ Nhân, thiếp đã thấy mãn nguyện lắm rồi. Nếu Chủ Nhân cũng cùng ngâm mình… thì đó quả là vinh hạnh tột bậc đối với thiếp. Ngài đồng ý sao? Thiếp vui quá! Vậy để thiếp mát-xa cho ngài nhé.', 'Khiêu Khích Đơn Thể'],
  ['37', 'Shy Diva', 'moc', 'ssr', 'publics/voice/9.mp3', 'Uh... Eh… cả người mình mềm nhũn ra rồi… Bảo là cơ thể mình vốn dĩ đã mềm sẵn rồi ư? Trời ơi! Đang thả lỏng ngon lành thế mà, nói vậy làm mình lại căng thẳng trở lại rồi…!', 'Tăng Công và Hồi HP'],
  ['38', 'Ailing Maiden', 'moc', 'ur', 'publics/voice/6.mp3', 'Ư…! Cơ thể mình… lạ quá… có thứ gì đó ấm áp… đang tràn vào… Haa…! Lồng ngực… nóng bừng lên… Chủ Nhân ơi… chẳng lẽ… bệnh tình của em… trở nặng rồi sao…?', 'Tăng ST HP Thấp'],
  ['39', 'Airy Fairy', 'moc', 'ur', 'publics/voice/7.mp3', 'Ưm... ấm áp quá... cứ như thể đang được bao bọc bởi những chiếc lá dưới ánh mặt trời vậy... Mi mắt mình nặng trĩu rồi... Chủ Nhân ơi... Ngài vẫn còn ở đó chứ? Nếu em lỡ ngủ thiếp đi... Ngài vẫn sẽ ở bên cạnh em mãi, đúng không...?', 'Phản Công Quần Thể'],
  ['40', 'Edge Shadow', 'moc', 'ur', 'publics/voice/8.mp3', 'Ư... Linh lực của suối nước nóng này... thật khủng khiếp... "Sức mạnh Long Thần" trong cơ thể ta đang mất kiểm soát...!? Này, đ-đừng nhìn gần như thế... Hả? Mặt ta đỏ ư? C-cái này... chỉ là do cơ thể nóng lên vì sức mạnh mất kiểm soát thôi!', 'Tiêu Diệt Truy Kích'],
  ['41', 'Dark Snow', 'thuy', 'gr', 'publics/voice/24.mp3', 'Ưm… tốt lắm, hoàng tử của ta, chàng mát-xa giỏi lên rồi đấy… Cảm giác cả cơ thể nóng bừng lên thế này… cũng không tệ chút nào.', 'Coming Soon'],
  ['42', 'Beggar Girl', 'thuy', 'lr', 'publics/voice/25.mp3', 'Em đã sẵn sàng rồi… cả người em nóng ran… chồng ơi… nắm lấy tay em đi… a, em… em sắp lên đỉnh rồi! Ưm, ưm, ưmmm…!', 'Chìm Đắm ST Vật Lý'],
  ['43', 'Duchess M', 'thuy', 'lr', 'publics/voice/26.mp3', 'Quả đúng là Chủ Nhân! Không ngờ lại giúp mình trưởng thành bằng cách mãnh liệt thế này! Khắp cơ thể nóng bừng lên… sướng… sướng quá đi mất! Ưm! A ha! Hi hi!', 'ST Ma Lực Quần Thể'],
  ['44', 'Fluffy Neko', 'thuy', 'lr', 'publics/voice/27.mp3', 'Ưm… nya… a, này… anh ơi, xấu hổ quá… nó lại… to lên rồi…', 'Tăng ST và Thêm ST'],
  ['45', 'Queen Otaku', 'thuy', 'lr', 'publics/voice/28.mp3', 'Toàn thân… nóng quá… đây là lên cấp sao? Ư… hộc… cố thêm chút nữa thôi… rồi mình sẽ có thể phá vỡ giới hạn!', 'Hiệu Ứng Bất Lợi Trị Liệu'],
  ['46', 'Abyssal Jelly', 'thuy', 'hr'],
  ['47', 'Naughty Slime', 'thuy', 'r', 'publics/voice/35.mp3', 'Làm sao đây… vì cơ thể mình đang trong suốt nên chẳng thể khoe ra thân hình hoàn hảo này được… nhỉ… Chủ Nhân? A! Cửa hàng trưởng đúng là thiên tài!! Đợi chút nhé, mình cởi khăn tắm ra đây! Tìm mình trong suối nước nóng nha!', 'Chìm Đắm Hàng Trước'],
  ['48', 'Polly Witch', 'thuy', 'sr', 'publics/voice/33.mp3', 'Cả em trai nữa, vào đây nào... Ngại à? Đừng bận tâm làm gì. Chị thích thân hình vạm vỡ của em lắm đấy, biết không? Nào, mình cùng kỳ lưng cho nhau nhé? Được chứ?', 'Giảm Kháng Ma Lực'],
  ['49', 'Tiểu Ác Ma Khiêu Khích', 'thuy', 'sr', 'publics/voice/34.mp3', 'Hi hi hi~♪ Tìm thấy bí mật xấu hổ của Chủ Nhân rồi nè~♪ Đừng hòng xin tha nhé. Tại vì em thích nhất là lúc Chủ Nhân cuống cuồng lên đấy~♪', 'Chìm Đắm Đơn Thể'],
  ['50', 'Cute Samurai', 'thuy', 'ssr', 'publics/voice/31.mp3', 'Lại đau đầu nữa sao?… V-vậy thì, như mọi khi, hãy tựa vào ngực em… Áo ngực vướng quá à? V-vâng… em tháo ra ngay đây…!', 'Ưu Tiên Hàng Sau'],
  ['51', 'Dorky Sadako', 'thuy', 'ssr', 'publics/voice/32.mp3', 'Ư... chặt quá, Chủ Nhân ơi!... Ngài định giúp tôi sao? Kh-không sao đâu... kiểu bị ép chặt thế này... tôi cũng không ghét đâu...', 'Tự Trị Liệu'],
  ['52', 'Brute Oni', 'thuy', 'ur', 'publics/voice/29.mp3', 'Này! Chủ Nhân! Ông đổ cái thứ thuốc quái quỷ gì vào suối nước nóng này đấy hả? Hộc… hộc… Cảm giác như có thứ gì đó sắp trào ra từ trong cơ thể tôi vậy, ngực nặng trĩu luôn rồi…', 'Tăng ST và Trảm Sát'],
  ['53', 'Virgin Slime', 'thuy', 'ur', 'publics/voice/30.mp3', 'Ưm... một luồng cảm xúc mãnh liệt đang lan tỏa trong cơ thể ta... ha... nó còn len lỏi vào tận những nơi nhạy cảm nhất nữa... làm tốt lắm, nhóc con. Đã lâu lắm rồi ta mới lại có được cảm giác mới mẻ đến thế này.', 'Chìm Đắm và Tăng ST']
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
