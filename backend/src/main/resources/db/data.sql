INSERT INTO users (user_id, role, nickname, email, password)
VALUES
    (1, 'USER', '테스트 계정1', 'test@test.com', '$2a$10$Ar8rO1gsvJM6V2v290Qx6uBwWJXFD8/pAqWDrTyW9MI1uwslY9Qqq'),
    (2, 'USER', '테스트 계정2', 'test2@test.com', '$2a$10$Ar8rO1gsvJM6V2v290Qx6uBwWJXFD8/pAqWDrTyW9MI1uwslY9Qqq');

ALTER TABLE users ALTER COLUMN user_id RESTART WITH 3;

INSERT INTO posts (post_id, title, content, user_id, status, view_count, created_at, updated_at)
VALUES (1, '첫 번째 글입니다', '이건 테스트용 게시글입니다', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE posts ALTER COLUMN post_id RESTART WITH 2;

INSERT INTO posts (title, content, user_id, status, view_count, created_at, updated_at)
VALUES
    ('테스트 글 1', '내용입니다 1', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 2', '내용입니다 2', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 3', '내용입니다 3', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 4', '내용입니다 4', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 5', '내용입니다 5', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 6', '내용입니다 6', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 7', '내용입니다 7', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 8', '내용입니다 8', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 9', '내용입니다 9', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 10', '내용입니다 10', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 11', '내용입니다 11', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 12', '내용입니다 12', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 13', '내용입니다 13', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 14', '내용입니다 14', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 15', '내용입니다 15', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 16', '내용입니다 16', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 17', '내용입니다 17', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 18', '내용입니다 18', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 19', '내용입니다 19', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 20', '내용입니다 20', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 21', '내용입니다 21', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 22', '내용입니다 22', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 23', '내용입니다 23', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 24', '내용입니다 24', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 25', '내용입니다 25', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 26', '내용입니다 26', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 27', '내용입니다 27', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 28', '내용입니다 28', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 29', '내용입니다 29', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 30', '내용입니다 30', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 31', '내용입니다 31', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 32', '내용입니다 32', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 33', '내용입니다 33', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 34', '내용입니다 34', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 35', '내용입니다 35', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 36', '내용입니다 36', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 37', '내용입니다 37', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 38', '내용입니다 38', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 39', '내용입니다 39', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 40', '내용입니다 40', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 41', '내용입니다 41', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 42', '내용입니다 42', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 43', '내용입니다 43', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 44', '내용입니다 44', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 45', '내용입니다 45', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 46', '내용입니다 46', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 47', '내용입니다 47', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 48', '내용입니다 48', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 49', '내용입니다 49', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 글 50', '내용입니다 50', 1, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 계정2가 작성한 글입니다', '다른 사용자가 작성한 게시글 권한 확인용 데이터입니다', 2, 'ACTIVE', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO comments (content, parent_id, post_id, user_id, status, created_at, updated_at)
VALUES
    ('첫 번째 댓글입니다', NULL, 1, 1, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('첫 번째 댓글의 대댓글입니다', 1, 1, 1, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('삭제 상태 댓글 예시입니다', NULL, 1, 1, 'DELETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('삭제 댓글의 대댓글 예시입니다', 3, 1, 1, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 계정2가 첫 번째 글에 작성한 댓글입니다', NULL, 1, 2, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('테스트 계정2가 첫 번째 댓글에 작성한 대댓글입니다', 1, 1, 2, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO restaurants
(name, area, category, address, description, image_url, map_url, latitude, longitude, recommended_menu, order_tip, warning_note, order_difficulty, english_level, solo_friendly, spicy_level, tourist_friendly, vegan_option, status, created_at, updated_at)
VALUES
    ('Choryang Milmyeon', 'BUSAN_STATION', 'NOODLES', '부산 동구 초량동 363-2', 'A reliable first stop near Busan Station for cold wheat noodles and dumplings. The menu is short, fast, and easy for visitors to understand.', 'https://placehold.co/800x500?text=Choryang%20Milmyeon', 'https://www.google.com/maps/search/?api=1&query=Choryang%20Milmyeon%20Busan', 35.1171158, 129.0406913, 'Milmyeon with dumplings', 'Order milmyeon first, then add mandu if you want a fuller meal. Pointing at the menu works well because the choices are simple.', 'Lunch can be busy, but turnover is fast. The broth is cold and lightly tangy, which may surprise first-time visitors.', 'EASY', 'BASIC', 'YES', 'MILD', 'HIGH', 'NONE', 'ACTIVE', NOW(), NOW()),
    ('Sinbalwon', 'BUSAN_STATION', 'DUMPLINGS', '부산 동구 차이나타운로', 'A Chinatown dumpling restaurant close to Busan Station, useful for travelers who want something familiar, quick, and shareable.', 'https://placehold.co/800x500?text=Sinbalwon', 'https://www.google.com/maps/search/?api=1&query=Sinbalwon%20Busan', 35.1147088, 129.0386310, 'Fried dumplings and steamed dumplings', 'Choose one fried dumpling plate and one steamed dumpling plate if visiting as two people. Solo diners can keep the order small.', 'There can be a queue during peak travel hours. Some items sell out later in the day.', 'EASY', 'GOOD', 'YES', 'NOT_SPICY', 'HIGH', 'LIMITED', 'ACTIVE', NOW(), NOW()),
    ('Bonjeon Dwaeji Gukbap', 'BUSAN_STATION', 'KOREAN_SOUP', '부산 동구 중앙대로214번길 3-8', 'A classic pork soup restaurant near Busan Station. It is a strong choice for visitors who want to try Busan-style gukbap without complicated ordering.', 'https://placehold.co/800x500?text=Bonjeon%20Gukbap', 'https://www.google.com/maps/search/?api=1&query=Bonjeon%20Dwaeji%20Gukbap%20Busan', 35.1166170, 129.0413612, 'Dwaeji gukbap', 'Order dwaeji gukbap and season the soup gradually with salt, chives, or sauce at the table.', 'English may be limited. The soup is mild by default, so add seasoning slowly.', 'EASY', 'NONE', 'YES', 'NOT_SPICY', 'HIGH', 'NONE', 'ACTIVE', NOW(), NOW()),
    ('Lee Jae Mo Pizza', 'NAMPO', 'SNACKS', '부산 중구 광복중앙로', 'A famous Busan pizza spot in Nampo with a familiar format for foreign visitors and a lively local atmosphere.', 'https://placehold.co/800x500?text=Lee%20Jae%20Mo%20Pizza', 'https://www.google.com/maps/search/?api=1&query=Lee%20Jae%20Mo%20Pizza%20Busan', 35.1009844, 129.0310242, 'Cheese crust pizza', 'Order a signature cheese pizza and share it. Kiosk or picture-based ordering is usually straightforward.', 'Expect waiting during meal times. This is not traditional Korean food, but it is very easy for mixed groups.', 'EASY', 'GOOD', 'YES', 'NOT_SPICY', 'HIGH', 'NONE', 'ACTIVE', NOW(), NOW()),
    ('Gaemijip Main Branch', 'NAMPO', 'RICE_BOWL', '부산 중구 중구로', 'A well-known Nampo restaurant for nakgopsae, a spicy seafood, tripe, and shrimp stew served with rice.', 'https://placehold.co/800x500?text=Gaemijip', 'https://www.google.com/maps/search/?api=1&query=Gaemijip%20Main%20Branch%20Busan', 35.1005937, 129.0300829, 'Nakgopsae with rice', 'Order nakgopsae and wait for the staff to cook it at the table. Mix the stew with rice when it is ready.', 'This dish is spicy and saucy. Ask for less spicy if possible, and avoid it if you cannot eat spicy food.', 'EASY', 'BASIC', 'YES', 'SPICY', 'HIGH', 'NONE', 'ACTIVE', NOW(), NOW()),
    ('Songjeong 3dae Gukbap', 'SEOMYEON', 'KOREAN_SOUP', '부산 부산진구 서면로', 'A long-running gukbap restaurant in Seomyeon with simple menus, quick service, and a practical setup for solo meals.', 'https://placehold.co/800x500?text=Songjeong%203dae%20Gukbap', 'https://www.google.com/maps/search/?api=1&query=Songjeong%203dae%20Gukbap%20Busan', 35.1557364, 129.0585495, 'Dwaeji gukbap set', 'Choose the basic pork soup if unsure. Side dishes and seasoning are self-adjusted at the table.', 'It can feel busy and local. The soup itself is mild, but table seasonings can make it stronger.', 'EASY', 'BASIC', 'YES', 'NOT_SPICY', 'HIGH', 'NONE', 'ACTIVE', NOW(), NOW()),
    ('Tonshou Gwangalli', 'GWANGALLI', 'SNACKS', '부산 수영구 광안해변로', 'A premium tonkatsu restaurant near Gwangalli, popular with locals and visitors who want a high-quality but familiar meal.', 'https://placehold.co/800x500?text=Tonshou%20Gwangalli', 'https://www.google.com/maps/search/?api=1&query=Tonshou%20Gwangalli%20Busan', 35.1530910, 129.1185400, 'Rosu katsu or hire katsu', 'Pick one cutlet set and follow the sauce guide on the table. Counter seating makes solo dining easy.', 'Waiting can be long and ordering may require following the shop system. Arrive early if this is a must-visit.', 'HARD', 'GOOD', 'YES', 'NOT_SPICY', 'MEDIUM', 'NONE', 'ACTIVE', NOW(), NOW()),
    ('Subyeon Choego Dwaeji Gukbap Gwangalli', 'GWANGALLI', 'KOREAN_SOUP', '부산 수영구 광안해변로', 'A comfortable pork soup restaurant near Gwangalli Beach with tablet-style ordering and long opening hours.', 'https://placehold.co/800x500?text=Subyeon%20Choego%20Gukbap', 'https://www.google.com/maps/search/?api=1&query=Subyeon%20Choego%20Dwaeji%20Gukbap%20Gwangalli%20Busan', 35.1540100, 129.1192800, 'Dwaeji gukbap with suyuk', 'Use the tablet menu if available. The basic gukbap is enough for one person, while suyuk is better for sharing.', 'Some broth and side dishes may feel rich or salty. Add spicy seasoning only after tasting.', 'NORMAL', 'GOOD', 'YES', 'MILD', 'HIGH', 'NONE', 'ACTIVE', NOW(), NOW()),
    ('Haemok', 'HAEUNDAE', 'RICE_BOWL', '부산 해운대구 구남로', 'A Haeundae restaurant known for eel rice bowls and seafood rice bowls. It is polished, traveler-friendly, and close to major tourist routes.', 'https://placehold.co/800x500?text=Haemok', 'https://www.google.com/maps/search/?api=1&query=Haemok%20Haeundae%20Busan', 35.1627340, 129.1603170, 'Eel rice bowl', 'Order the eel rice bowl and follow the three-step eating guide if provided: plain, with condiments, then with broth.', 'Prices are higher than casual meals, and waits are common. Seafood options may not suit every diet.', 'NORMAL', 'BASIC', 'YES', 'NOT_SPICY', 'HIGH', 'NONE', 'ACTIVE', NOW(), NOW()),
    ('Veggie Narang', 'GWANGALLI', 'VEGETARIAN', '부산 수영구 광안해변로', 'A vegan-friendly Korean fusion option near Gwangalli, useful for travelers who need plant-based food without giving up local flavors.', 'https://placehold.co/800x500?text=Veggie%20Narang', 'https://www.google.com/maps/search/?api=1&query=Veggie%20Narang%20Busan', 35.1567300, 129.1342916, 'Vegan Korean set meal', 'Tell the staff you want vegan food and choose one set meal. It is one of the easier options for plant-based visitors.', 'Opening hours and menu availability can change. Check before going if vegan dining is essential for your group.', 'EASY', 'GOOD', 'YES', 'NOT_SPICY', 'HIGH', 'VEGAN_ONLY', 'ACTIVE', NOW(), NOW());
