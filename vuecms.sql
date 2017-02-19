/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : vuecms

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-02-19 13:05:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `login_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_super` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES ('1', 'admin', 'zanjser@163.com', '$2y$10$I3XrqVh4nWznzGiR7SRUKuNyKeeDkoOFPRYUZVpVW2HRnjOTrFfXO', 'http://lorempixel.com/100/100/?40707', '58a926f97614c', '1', null, '2016-09-11 01:47:37', '2017-02-19 05:02:49');
INSERT INTO `admins` VALUES ('2', 'yang', 'yang@yang.com', '$2y$10$vhKlDhaKHKsI4eeK8IoUleqkXIf/oJRtXWBhI6o48sa3n09K1PdV6', '/uploads/2016091613593757dbfac997696.png', '57f87c1591aef', '1', null, '2016-09-11 01:47:37', '2016-10-08 04:54:45');
INSERT INTO `admins` VALUES ('13', 'zhang', 'zhang@zhang.com', 'zhang', '', null, '0', null, '2016-09-16 10:55:59', '2016-09-16 10:55:59');
INSERT INTO `admins` VALUES ('14', 'zhang', '719940262@qq.com', '3k47vx@zhang', '', null, '0', null, '2016-10-06 13:19:05', '2016-10-06 13:19:05');

-- ----------------------------
-- Table structure for citys
-- ----------------------------
DROP TABLE IF EXISTS `citys`;
CREATE TABLE `citys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned NOT NULL DEFAULT '1',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of citys
-- ----------------------------
INSERT INTO `citys` VALUES ('13', '0', '无锡', '2016-09-15 11:31:22', '2016-09-15 11:31:22');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int(10) unsigned NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_house_id_foreign` (`house_id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '27', 'Dolorem est rerum expedita vitae explicabo. Sequi et libero perferendis.', 'Dolores Schuster', 'cprohaska@hotmail.com', 'http://mann.com/tenetur-fugiat-neque-mollitia-eius-non-asperiores-et-ipsum', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('2', '12', 'Fugit sed ut quis eaque repellat. Dolor omnis culpa fugit vero ipsam rerum. Minima voluptas quod minus dolore.', 'Lori Hamill', 'braxton28@senger.com', 'http://www.treutel.com/', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('3', '20', 'Expedita et iure ut harum occaecati. Voluptas et ipsam sit est laborum exercitationem. Quia optio iusto commodi vero veniam illo reprehenderit.', 'Dr. Anya Thompson Jr.', 'hoppe.eliane@hotmail.com', 'http://www.marks.com/occaecati-nobis-fuga-repellat-voluptatibus', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('4', '3', 'Quod magni eos quo voluptates totam nostrum cum. Qui sit in deleniti. Doloremque minima accusantium consequatur alias porro non.', 'Cassandre Blick', 'vickie.schuppe@lockman.info', 'http://www.witting.net/fuga-eius-sequi-excepturi-commodi-deserunt-ex-praesentium', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('5', '4', 'Soluta magnam numquam aliquid blanditiis eos magni quaerat. Fugiat beatae veniam eius odio. Id repellat perspiciatis laborum quia esse alias magni.', 'Giovanni Nikolaus Sr.', 'jeramy.schmitt@hotmail.com', 'https://www.fay.com/eos-libero-sint-laudantium-sequi-amet-hic', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('6', '8', 'Voluptate quo possimus est omnis. Itaque sint aut beatae voluptatibus ut. Optio id voluptatem nemo qui. Voluptate odio eaque illum id.', 'Gracie Gaylord I', 'vivianne13@gmail.com', 'http://grady.com/et-mollitia-delectus-repellendus-accusamus-maxime-eum-quis-adipisci', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('7', '23', 'Consequuntur et suscipit rerum omnis ut eveniet voluptatem deserunt. Necessitatibus cum cupiditate et deleniti vitae. Ut molestiae at sed accusamus corporis sequi eveniet. Ex ipsa et tempore architecto maxime facere.', 'Prof. Micaela Pacocha DDS', 'freddy72@yahoo.com', 'http://schneider.com/veritatis-nulla-voluptatem-unde-nulla-omnis-blanditiis.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('8', '30', 'Iusto quasi hic culpa unde dicta quia fugit adipisci. Eos amet voluptas consequatur. Distinctio voluptatem blanditiis quos suscipit. Corrupti cum non consequatur debitis officiis maiores dicta earum.', 'Prof. Gaston Swaniawski II', 'athena18@gmail.com', 'http://jerde.com/amet-quia-est-sapiente', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('9', '16', 'Sit molestiae voluptates provident iusto vel qui magni. Perspiciatis omnis ullam dolor ut dolorem magni veritatis et. Delectus dolorem sunt reiciendis aut tenetur. Quia hic possimus natus dolorem mollitia.', 'Lizeth Reichert', 'maybell13@hotmail.com', 'http://langosh.com/fugiat-aut-sint-earum-sint-exercitationem.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('10', '21', 'Voluptatem quasi nihil autem. Harum repudiandae quo sunt eveniet. Cupiditate debitis quo eveniet voluptatem nostrum.', 'Cyrus Russel', 'beahan.kory@heathcote.biz', 'http://volkman.com/optio-voluptatem-aut-ex-eaque', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('11', '12', 'Recusandae impedit magnam culpa aperiam suscipit sit autem. Consequatur atque est perspiciatis. Est incidunt aut itaque natus ratione.', 'Reyna Franecki', 'shany75@reilly.com', 'http://www.altenwerth.com/', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('12', '21', 'Fuga aliquid tempore et aperiam soluta. Praesentium accusantium autem aliquid qui aut quaerat architecto quis. Minus nesciunt suscipit molestiae. Iusto consequuntur recusandae modi molestiae in.', 'Mrs. Violette Schaden DDS', 'leilani06@yahoo.com', 'http://www.wisozk.org/mollitia-aspernatur-ducimus-itaque-assumenda', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('13', '8', 'Aliquam ut asperiores dolorum sint. Totam expedita ipsum non quia porro qui.', 'Prof. Marquis Morissette', 'hermann.stephen@hotmail.com', 'http://www.zemlak.biz/nihil-est-perspiciatis-explicabo-impedit', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('14', '11', 'Quia impedit consectetur voluptates quis. Sed voluptatem eius sint quisquam sit unde. Tenetur illo eos ipsum hic doloremque. Tempora libero ut incidunt beatae neque sit. Et velit aut voluptatibus quis ut.', 'Isadore Blick', 'watsica.claud@yahoo.com', 'https://stark.com/animi-nisi-velit-ut-quam-dolor.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('15', '18', 'Odit et iusto ut soluta. Et rem corporis eum nesciunt iusto suscipit eius. Eum eligendi et possimus suscipit dolorem mollitia.', 'Ms. Jacinthe Erdman', 'wcruickshank@hansen.com', 'http://www.dach.info/illum-autem-sit-eveniet-sed-cupiditate-vitae-non', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('16', '7', 'Id non ut odit consectetur molestiae ut nobis eius. Officiis ea soluta fugiat velit officia dolor animi. Id voluptatibus et amet ullam ut laborum voluptas. Dolorem placeat et libero aut et repellendus.', 'Carolyne Hammes', 'agustina.auer@strosin.com', 'http://rau.org/', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('17', '10', 'Voluptates veniam doloremque autem ut culpa quibusdam. Illum quaerat odio sint reprehenderit accusantium sit exercitationem. Eos excepturi est maxime provident et incidunt consequuntur suscipit.', 'Prof. Tito Legros', 'janice92@yahoo.com', 'http://kunde.com/autem-velit-quod-voluptas-mollitia-reiciendis-aliquid', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('18', '28', 'Rerum nisi qui odit et. Adipisci ea ipsum et ipsam quia quaerat. Veniam autem et et sint porro quas.', 'Laura Williamson', 'carlie.rutherford@hotmail.com', 'http://treutel.biz/ducimus-et-sit-accusantium-non-et-quae-aliquid.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('19', '7', 'Quod ratione corrupti cum voluptas in. Facere consectetur nihil ipsam ea sint fugit delectus. Atque enim officia quae aspernatur tempora voluptatem.', 'Blake Ziemann', 'tmann@shields.net', 'http://goyette.com/nobis-in-vitae-et-enim-est.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('20', '6', 'Non quia voluptatem fuga molestiae non consequatur dolore. Sint omnis nostrum sit perspiciatis illo accusantium. Beatae est earum quia id est labore. Qui officiis ad aspernatur.', 'Miss Lenore Carroll DVM', 'bobbie.schuppe@yahoo.com', 'http://www.greenholt.net/qui-enim-natus-et-corrupti-facere-et-non', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('21', '19', 'Tempore et voluptas id. Ut fugiat minus quo voluptatem temporibus quia natus. Nihil voluptas neque consectetur aliquam mollitia. Ut repellat consequuntur aspernatur voluptatem.', 'Beulah Welch', 'hoppe.woodrow@hotmail.com', 'http://zulauf.com/quia-ratione-fuga-iure-consequatur.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('22', '11', 'Magnam dignissimos voluptatem autem alias commodi necessitatibus. Facere similique sed ipsa harum placeat cumque. Commodi tenetur eos quae architecto.', 'Mrs. Aubrey Considine', 'merritt30@hotmail.com', 'http://www.schmeler.info/', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('23', '24', 'Omnis et fuga rem soluta omnis non sapiente sint. Eveniet rerum ipsam sunt facere voluptatem rem voluptatem. Accusantium at blanditiis ea velit. Modi minus quaerat laudantium dolorum amet eos est accusamus.', 'Ms. Valerie Robel II', 'mosciski.garrick@schimmel.info', 'http://www.adams.com/impedit-delectus-non-et-voluptatum-consequatur.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('24', '26', 'Doloremque magni et voluptatem voluptatum natus assumenda. Ut est eum fugit et sint omnis rerum. Voluptas nobis consequatur placeat perspiciatis quia ea atque. Ut aut quia consequatur laborum iusto.', 'Andreanne Grady Jr.', 'cade.rempel@gmail.com', 'http://www.balistreri.com/et-praesentium-ab-reiciendis-fugiat-quo', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('25', '26', 'Excepturi molestias minima quam ipsam quae tempora sit. Velit modi natus itaque quasi ullam aut. Error repudiandae qui voluptatibus aut. Voluptas totam ipsum et earum minima soluta fuga.', 'Destin Hoppe I', 'rrippin@gleason.net', 'http://www.mclaughlin.com/impedit-temporibus-velit-impedit-fugiat-rerum-distinctio.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('26', '29', 'Blanditiis soluta aut fugit in itaque dolorum. Earum nemo nobis velit voluptatem et. Dicta magnam veniam officiis ut molestiae illum sit.', 'Deondre Carter', 'laurel.fritsch@gmail.com', 'http://schamberger.com/expedita-nobis-tenetur-quaerat-rerum-et-ut', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('27', '29', 'Nostrum voluptatum dolorem qui maxime explicabo. Tempore vel est quod eaque voluptates ducimus vel. Omnis blanditiis perferendis officiis explicabo velit molestiae.', 'Helga Muller', 'icassin@hotmail.com', 'http://dooley.biz/aut-sed-sapiente-consequatur-deleniti', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('28', '1', 'Molestiae et fuga provident sit. Culpa neque dolore doloribus voluptas voluptatem. Quia ut a maxime ab velit enim cum vitae.', 'Lenny Collins', 'casper.jessica@hotmail.com', 'http://littel.com/perferendis-quisquam-aut-soluta-aut.html', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('29', '9', 'Esse praesentium reiciendis facilis esse alias. Fugiat nesciunt et dolor tenetur consequatur. Similique sed sit culpa sed consequatur minus.', 'Tania Breitenberg', 'dgislason@gmail.com', 'http://www.weimann.com/', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `comments` VALUES ('30', '3', 'Ducimus ipsa maxime facilis eum ut ducimus aliquam. Facere voluptatum nesciunt laborum placeat nesciunt adipisci et. Aperiam autem ipsa nesciunt qui et totam nesciunt. Quam quod sapiente provident sint nostrum expedita quam ut.', 'Prof. Justus Bailey DVM', 'eschultz@yahoo.com', 'http://ruecker.net/reprehenderit-consequatur-minus-nostrum-veniam-corrupti-dolorem', '2016-09-11 01:47:38', '2016-09-11 01:47:38');

-- ----------------------------
-- Table structure for houses
-- ----------------------------
DROP TABLE IF EXISTS `houses`;
CREATE TABLE `houses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `city_id` int(10) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `geohash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status_id` int(11) NOT NULL,
  `latitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `allow_comment` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `flag` tinyint(1) NOT NULL DEFAULT '0',
  `number` varchar(233) COLLATE utf8_unicode_ci DEFAULT NULL,
  `products` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `houses_city_id_foreign` (`city_id`)
) ENGINE=MyISAM AUTO_INCREMENT=317 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of houses
-- ----------------------------

-- ----------------------------
-- Table structure for house_images
-- ----------------------------
DROP TABLE IF EXISTS `house_images`;
CREATE TABLE `house_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int(10) unsigned NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `house_images_house_id_foreign` (`house_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of house_images
-- ----------------------------
INSERT INTO `house_images` VALUES ('1', '20', 'http://lorempixel.com/640/480/?70403', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('2', '29', 'http://lorempixel.com/640/480/?35388', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('3', '3', 'http://lorempixel.com/640/480/?72607', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('4', '28', 'http://lorempixel.com/640/480/?52888', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('5', '9', 'http://lorempixel.com/640/480/?27054', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('6', '3', 'http://lorempixel.com/640/480/?67252', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('7', '25', 'http://lorempixel.com/640/480/?41086', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('8', '21', 'http://lorempixel.com/640/480/?19178', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('9', '5', 'http://lorempixel.com/640/480/?76134', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('10', '24', 'http://lorempixel.com/640/480/?89402', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('11', '29', 'http://lorempixel.com/640/480/?39207', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('12', '3', 'http://lorempixel.com/640/480/?53932', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('13', '19', 'http://lorempixel.com/640/480/?34967', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('14', '30', 'http://lorempixel.com/640/480/?70699', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('15', '27', 'http://lorempixel.com/640/480/?14050', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('16', '10', 'http://lorempixel.com/640/480/?30349', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('17', '15', 'http://lorempixel.com/640/480/?64371', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('18', '5', 'http://lorempixel.com/640/480/?66571', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('19', '2', 'http://lorempixel.com/640/480/?99883', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `house_images` VALUES ('20', '4', 'http://lorempixel.com/640/480/?96104', '2016-09-11 01:47:38', '2016-09-11 01:47:38');

-- ----------------------------
-- Table structure for house_tag
-- ----------------------------
DROP TABLE IF EXISTS `house_tag`;
CREATE TABLE `house_tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `house_tag_house_id_index` (`house_id`),
  KEY `house_tag_tag_id_index` (`tag_id`)
) ENGINE=MyISAM AUTO_INCREMENT=91 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of house_tag
-- ----------------------------
INSERT INTO `house_tag` VALUES ('1', '1', '12', null, null);
INSERT INTO `house_tag` VALUES ('2', '1', '7', null, null);
INSERT INTO `house_tag` VALUES ('3', '1', '15', null, null);
INSERT INTO `house_tag` VALUES ('4', '2', '2', null, null);
INSERT INTO `house_tag` VALUES ('5', '2', '4', null, null);
INSERT INTO `house_tag` VALUES ('6', '2', '14', null, null);
INSERT INTO `house_tag` VALUES ('7', '3', '5', null, null);
INSERT INTO `house_tag` VALUES ('8', '3', '6', null, null);
INSERT INTO `house_tag` VALUES ('9', '3', '4', null, null);
INSERT INTO `house_tag` VALUES ('10', '4', '3', null, null);
INSERT INTO `house_tag` VALUES ('11', '4', '16', null, null);
INSERT INTO `house_tag` VALUES ('12', '4', '11', null, null);
INSERT INTO `house_tag` VALUES ('13', '5', '15', null, null);
INSERT INTO `house_tag` VALUES ('14', '5', '16', null, null);
INSERT INTO `house_tag` VALUES ('15', '5', '14', null, null);
INSERT INTO `house_tag` VALUES ('16', '6', '15', null, null);
INSERT INTO `house_tag` VALUES ('17', '6', '1', null, null);
INSERT INTO `house_tag` VALUES ('18', '6', '11', null, null);
INSERT INTO `house_tag` VALUES ('19', '7', '20', null, null);
INSERT INTO `house_tag` VALUES ('20', '7', '7', null, null);
INSERT INTO `house_tag` VALUES ('21', '7', '5', null, null);
INSERT INTO `house_tag` VALUES ('22', '8', '14', null, null);
INSERT INTO `house_tag` VALUES ('23', '8', '19', null, null);
INSERT INTO `house_tag` VALUES ('24', '8', '16', null, null);
INSERT INTO `house_tag` VALUES ('25', '9', '17', null, null);
INSERT INTO `house_tag` VALUES ('26', '9', '18', null, null);
INSERT INTO `house_tag` VALUES ('27', '9', '15', null, null);
INSERT INTO `house_tag` VALUES ('28', '10', '12', null, null);
INSERT INTO `house_tag` VALUES ('29', '10', '17', null, null);
INSERT INTO `house_tag` VALUES ('30', '10', '16', null, null);
INSERT INTO `house_tag` VALUES ('31', '11', '19', null, null);
INSERT INTO `house_tag` VALUES ('32', '11', '8', null, null);
INSERT INTO `house_tag` VALUES ('33', '11', '1', null, null);
INSERT INTO `house_tag` VALUES ('34', '12', '13', null, null);
INSERT INTO `house_tag` VALUES ('35', '12', '1', null, null);
INSERT INTO `house_tag` VALUES ('36', '12', '5', null, null);
INSERT INTO `house_tag` VALUES ('37', '13', '11', null, null);
INSERT INTO `house_tag` VALUES ('38', '13', '15', null, null);
INSERT INTO `house_tag` VALUES ('39', '13', '5', null, null);
INSERT INTO `house_tag` VALUES ('40', '14', '19', null, null);
INSERT INTO `house_tag` VALUES ('41', '14', '1', null, null);
INSERT INTO `house_tag` VALUES ('42', '14', '13', null, null);
INSERT INTO `house_tag` VALUES ('43', '15', '11', null, null);
INSERT INTO `house_tag` VALUES ('44', '15', '16', null, null);
INSERT INTO `house_tag` VALUES ('45', '15', '3', null, null);
INSERT INTO `house_tag` VALUES ('46', '16', '7', null, null);
INSERT INTO `house_tag` VALUES ('47', '16', '12', null, null);
INSERT INTO `house_tag` VALUES ('48', '16', '14', null, null);
INSERT INTO `house_tag` VALUES ('49', '17', '5', null, null);
INSERT INTO `house_tag` VALUES ('50', '17', '14', null, null);
INSERT INTO `house_tag` VALUES ('51', '17', '15', null, null);
INSERT INTO `house_tag` VALUES ('52', '18', '16', null, null);
INSERT INTO `house_tag` VALUES ('53', '18', '15', null, null);
INSERT INTO `house_tag` VALUES ('54', '18', '5', null, null);
INSERT INTO `house_tag` VALUES ('55', '19', '16', null, null);
INSERT INTO `house_tag` VALUES ('56', '19', '2', null, null);
INSERT INTO `house_tag` VALUES ('57', '19', '10', null, null);
INSERT INTO `house_tag` VALUES ('58', '20', '2', null, null);
INSERT INTO `house_tag` VALUES ('59', '20', '19', null, null);
INSERT INTO `house_tag` VALUES ('60', '20', '1', null, null);
INSERT INTO `house_tag` VALUES ('61', '21', '6', null, null);
INSERT INTO `house_tag` VALUES ('62', '21', '11', null, null);
INSERT INTO `house_tag` VALUES ('63', '21', '7', null, null);
INSERT INTO `house_tag` VALUES ('64', '22', '5', null, null);
INSERT INTO `house_tag` VALUES ('65', '22', '2', null, null);
INSERT INTO `house_tag` VALUES ('66', '22', '20', null, null);
INSERT INTO `house_tag` VALUES ('67', '23', '4', null, null);
INSERT INTO `house_tag` VALUES ('68', '23', '18', null, null);
INSERT INTO `house_tag` VALUES ('69', '23', '15', null, null);
INSERT INTO `house_tag` VALUES ('70', '24', '3', null, null);
INSERT INTO `house_tag` VALUES ('71', '24', '17', null, null);
INSERT INTO `house_tag` VALUES ('72', '24', '15', null, null);
INSERT INTO `house_tag` VALUES ('73', '25', '17', null, null);
INSERT INTO `house_tag` VALUES ('74', '25', '12', null, null);
INSERT INTO `house_tag` VALUES ('75', '25', '15', null, null);
INSERT INTO `house_tag` VALUES ('76', '26', '17', null, null);
INSERT INTO `house_tag` VALUES ('77', '26', '10', null, null);
INSERT INTO `house_tag` VALUES ('78', '26', '15', null, null);
INSERT INTO `house_tag` VALUES ('79', '27', '8', null, null);
INSERT INTO `house_tag` VALUES ('80', '27', '14', null, null);
INSERT INTO `house_tag` VALUES ('81', '27', '19', null, null);
INSERT INTO `house_tag` VALUES ('82', '28', '19', null, null);
INSERT INTO `house_tag` VALUES ('83', '28', '4', null, null);
INSERT INTO `house_tag` VALUES ('84', '28', '1', null, null);
INSERT INTO `house_tag` VALUES ('85', '29', '15', null, null);
INSERT INTO `house_tag` VALUES ('86', '29', '3', null, null);
INSERT INTO `house_tag` VALUES ('87', '29', '8', null, null);
INSERT INTO `house_tag` VALUES ('88', '30', '9', null, null);
INSERT INTO `house_tag` VALUES ('89', '30', '5', null, null);
INSERT INTO `house_tag` VALUES ('90', '30', '20', null, null);

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table', '1');
INSERT INTO `migrations` VALUES ('2014_10_12_100000_create_password_resets_table', '1');
INSERT INTO `migrations` VALUES ('2016_03_21_075602_create_citys_table', '1');
INSERT INTO `migrations` VALUES ('2016_03_21_083139_create_houses_table', '1');
INSERT INTO `migrations` VALUES ('2016_03_21_083909_create_house_images', '1');
INSERT INTO `migrations` VALUES ('2016_04_12_062142_create_admins_table', '1');
INSERT INTO `migrations` VALUES ('2016_05_11_011525_create_status_table', '1');
INSERT INTO `migrations` VALUES ('2016_05_11_011525_create_tags_table', '1');
INSERT INTO `migrations` VALUES ('2016_05_11_011558_create_house_tag_table', '1');
INSERT INTO `migrations` VALUES ('2016_05_11_011624_create_comments_table', '1');
INSERT INTO `migrations` VALUES ('2016_10_08_060252_create_product_table', '2');
INSERT INTO `migrations` VALUES ('2016_10_08_061316_create_shop_product_table', '2');
INSERT INTO `migrations` VALUES ('2016_10_09_060048_create_product_consum_table', '2');

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `norm` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', '西红柿', '', '11.00', '一盒', '2016-10-09 06:36:03', '2016-10-09 06:46:24');
INSERT INTO `products` VALUES ('2', '黄瓜', '', '11.00', '一箱', '2016-10-09 06:43:44', '2016-10-09 06:44:44');
INSERT INTO `products` VALUES ('3', '橘子', '', '22.00', '一斤', '2016-10-09 06:44:14', '2016-10-09 06:44:14');
INSERT INTO `products` VALUES ('4', '花菜', '', '1210.00', '一车', '2016-10-09 06:45:32', '2016-10-09 06:45:32');

-- ----------------------------
-- Table structure for product_comsum
-- ----------------------------
DROP TABLE IF EXISTS `product_comsum`;
CREATE TABLE `product_comsum` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `shop_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of product_comsum
-- ----------------------------

-- ----------------------------
-- Table structure for shop_products
-- ----------------------------
DROP TABLE IF EXISTS `shop_products`;
CREATE TABLE `shop_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shop_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `flag` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `condition` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of shop_products
-- ----------------------------
INSERT INTO `shop_products` VALUES ('1', '35', '1', '', '11.01', '1', '0', '2016-10-10 06:13:08', '2016-10-10 06:13:08');
INSERT INTO `shop_products` VALUES ('2', '35', '3', '', '22.00', '1', '0', '2016-10-10 06:14:16', '2016-10-10 06:14:16');
INSERT INTO `shop_products` VALUES ('3', '33', '3', '', '22.00', '1', '0', '2016-10-10 06:14:36', '2016-10-10 06:14:36');
INSERT INTO `shop_products` VALUES ('4', '35', '3', '', '22.00', '111', '0', '2016-10-10 06:21:46', '2016-10-10 06:21:46');
INSERT INTO `shop_products` VALUES ('5', '35', '3', '', '22.00', '111', '0', '2016-10-10 06:22:00', '2016-10-10 06:22:00');
INSERT INTO `shop_products` VALUES ('6', '35', '4', '', '1210.00', '11', '0', '2016-10-10 06:23:06', '2016-10-10 06:23:06');
INSERT INTO `shop_products` VALUES ('7', '35', '2', '', '11.00', '111', '0', '2016-10-10 07:02:07', '2016-10-10 07:02:07');
INSERT INTO `shop_products` VALUES ('16', '36', '1', '', '11.00', '222', '0', '2016-10-10 08:43:03', '2016-10-10 08:43:03');

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of status
-- ----------------------------
INSERT INTO `status` VALUES ('1', '洽谈', '/uploads/2016092012585957e1329312baf.png', '2016-09-11 01:47:38', '2016-09-20 12:59:00');
INSERT INTO `status` VALUES ('2', '收集', '/uploads/2016092013085357e134e5274da.png', '2016-09-11 01:47:38', '2016-09-20 13:08:54');
INSERT INTO `status` VALUES ('3', '专柜', '/uploads/2016091613143757dbf03d037fc.png', '2016-09-11 01:47:38', '2016-09-16 13:14:38');
INSERT INTO `status` VALUES ('4', '自有', '/uploads/2016092013061057e1344275804.png', '2016-09-11 01:47:38', '2016-09-20 13:06:11');
INSERT INTO `status` VALUES ('5', '拒绝', '/uploads/2016092013043357e133e17f0d5.png', '2016-09-11 01:47:38', '2016-09-20 13:04:34');
INSERT INTO `status` VALUES ('6', '关闭', '/uploads/2016092013035857e133be114ac.png', '2016-09-16 12:56:13', '2016-09-20 13:03:58');
INSERT INTO `status` VALUES ('7', '进行', '/uploads/2016092013034757e133b3a86bc.png', '2016-09-17 12:05:51', '2016-09-20 13:03:49');
INSERT INTO `status` VALUES ('8', '无效', '/uploads/2016092013030157e133855f2a9.png', '2016-09-20 12:25:45', '2016-09-20 13:03:02');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', 'et', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('2', 'ipsum', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('3', 'sint', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('4', 'atque', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('5', 'reiciendis', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('6', 'dignissimos', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('7', 'sunt', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('8', 'aut', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('9', 'non', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('10', 'ipsum', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('11', 'error', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('12', 'perferendis', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('13', 'voluptatem', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('14', 'veritatis', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('15', 'qui', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('16', 'dolorum', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('17', 'voluptatem', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('18', 'rem', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('19', 'placeat', '2016-09-11 01:47:38', '2016-09-11 01:47:38');
INSERT INTO `tags` VALUES ('20', 'eos', '2016-09-11 01:47:38', '2016-09-11 01:47:38');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'zanjser', 'zanjser@163.com', '$2y$10$7A5IHGV1ccL8fDH5QDzMouwGM3oZccC/bbnFWl.dSC3Axuko1V1ja', 'http://lorempixel.com/100/100/?44801', null, '2016-09-11 01:47:36', '2016-09-11 01:47:36');
INSERT INTO `users` VALUES ('2', 'stark.sterling', 'user1@zanjs.com', '$2y$10$WWC5oDK6SMfQO9oJ4Z34xe95bRUEpaGwjYygA9hcOBu8.QZv4yxMi', 'http://lorempixel.com/100/100/?39209', null, '2016-09-11 01:47:36', '2016-09-11 01:47:36');
INSERT INTO `users` VALUES ('3', 'aurelia12', 'user2@zanjs.com', '$2y$10$naZC6fQpNMXCBElspDG...M8IO3iPoE2qDU7..9qApW7b5f0LYMvm', 'http://lorempixel.com/100/100/?34889', null, '2016-09-11 01:47:36', '2016-09-11 01:47:36');
INSERT INTO `users` VALUES ('4', 'delmer.mckenzie', 'user3@zanjs.com', '$2y$10$5Pvmxveek68YgkMv.n1qnOxYeEy/vIRSlaRiUjPYRpxpCKrWDUmly', 'http://lorempixel.com/100/100/?48435', null, '2016-09-11 01:47:36', '2016-09-11 01:47:36');
INSERT INTO `users` VALUES ('5', 'ischroeder', 'user4@zanjs.com', '$2y$10$D0pDcZmf4nt5Mvcafc0fC.ovJlGl.NExFFIL5kM0bAFVRj8/ygElG', 'http://lorempixel.com/100/100/?53648', null, '2016-09-11 01:47:36', '2016-09-11 01:47:36');
INSERT INTO `users` VALUES ('6', 'ostoltenberg', 'user5@zanjs.com', '$2y$10$NakKT8qciqosCfh3levOzuVz.9mIqEDMU01pHpu/SB440y1FE0oE2', 'http://lorempixel.com/100/100/?10849', null, '2016-09-11 01:47:36', '2016-09-11 01:47:36');
INSERT INTO `users` VALUES ('7', 'imelda74', 'user6@zanjs.com', '$2y$10$h78b1iHqHaVk.ephq0ISPOnfh8mOxek3ESbk8HYINbPa1H7Muwg9C', 'http://lorempixel.com/100/100/?79450', null, '2016-09-11 01:47:37', '2016-09-11 01:47:37');
INSERT INTO `users` VALUES ('8', 'cwolf', 'user7@zanjs.com', '$2y$10$nrAJe90Ry0jlujcjkdL22ulwmSDoVkDP6K2dYQ019ToQJL0nmMH2W', 'http://lorempixel.com/100/100/?85834', null, '2016-09-11 01:47:37', '2016-09-11 01:47:37');
INSERT INTO `users` VALUES ('9', 'fmertz', 'user8@zanjs.com', '$2y$10$4HnqLgtJSQ5ltcZlkGp0OekYtvGv5ByP81rQV7y9M5e4dkroWEKF.', 'http://lorempixel.com/100/100/?38204', null, '2016-09-11 01:47:37', '2016-09-11 01:47:37');
INSERT INTO `users` VALUES ('10', 'diana03', 'user9@zanjs.com', '$2y$10$uc6kzPtwfqr4b2vVr.gNZOkjOVquphkQkEhdPsr2L.E8rvnrR0Co6', 'http://lorempixel.com/100/100/?56736', null, '2016-09-11 01:47:37', '2016-09-11 01:47:37');
INSERT INTO `users` VALUES ('11', 'cschaefer', 'user10@zanjs.com', '$2y$10$BqT3yaceQZc3HPmcUy9ee.Yc3fIt3iaARD3r20ZaqSJCtuGE1kRt.', 'http://lorempixel.com/100/100/?42311', null, '2016-09-11 01:47:37', '2016-09-11 01:47:37');
SET FOREIGN_KEY_CHECKS=1;
