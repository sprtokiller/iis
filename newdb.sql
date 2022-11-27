USE `xkrizv03`;
DROP procedure IF EXISTS `can_register`;

DELIMITER $$
USE `xkrizv03`$$
CREATE PROCEDURE `can_register` (IN username VARCHAR(256), IN email VARCHAR(256))
BEGIN
	SELECT COUNT(*) AS `count` FROM `users` WHERE `users`.`username` = username OR `users`.`email` = email;
END$$

DELIMITER ;
-- --------------------------------------------------------
USE `xkrizv03`;
DROP procedure IF EXISTS `add_user`;

DELIMITER $$
USE `xkrizv03`$$
CREATE PROCEDURE `add_user` (IN username VARCHAR(256), IN passhash VARCHAR(256), IN email VARCHAR(256), IN firstname VARCHAR(256), IN lastname VARCHAR(256))
BEGIN
	INSERT INTO `users` (`username`, `passhash`, `email`, `firstname`, `lastname`, `register_date`) VALUES (username, passhash, email, firstname, lastname, CURDATE());
    SELECT `u_id`, `role_id` FROM `users` WHERE `users`.`username` = username AND `users`.`email` = email;
END$$

DELIMITER ;
-- --------------------------------------------------------
USE `xkrizv03`;
DROP procedure IF EXISTS `view_user`;

DELIMITER $$
USE `xkrizv03`$$
CREATE PROCEDURE `view_user` (IN search_u_id INTEGER)
BEGIN
	SELECT `u_id`, `username`, `role_id`, `firstname`, `lastname`, `img_path`, `register_date`, `karma`, `brief` FROM `users` WHERE `users`.`u_id` = search_u_id;
END$$

DELIMITER ;
-- --------------------------------------------------------
USE `xkrizv03`;
DROP procedure IF EXISTS `view_user`;

DELIMITER $$
USE `xkrizv03`$$
CREATE PROCEDURE `view_user` (IN search_u_id INTEGER)
BEGIN
	SELECT `u_id`, `username`, `email`, `role_id`, `firstname`, `lastname`, `img_path`, `register_date`, `karma`, `brief` FROM `users` WHERE `users`.`u_id` = search_u_id;
END$$

DELIMITER ;
-- --------------------------------------------------------
USE `xkrizv03`;
DROP procedure IF EXISTS `update_user`;

DELIMITER $$
USE `xkrizv03`$$
CREATE PROCEDURE `update_user` (IN new_email VARCHAR(256),
IN new_firstname VARCHAR(256), IN new_lastname VARCHAR(256), IN new_brief TEXT, IN search_u_id INTEGER)
BEGIN
	UPDATE `users` SET 
    `email` = COALESCE(new_email, `email`), `firstname` = COALESCE(new_firstname, `firstname`),
	`lastname` = COALESCE(new_lastname, `lastname`), `brief` = COALESCE(new_brief, `brief`) WHERE `u_id` = search_u_id;
END$$

DELIMITER ;
-- --------------------------------------------------------
USE `xkrizv03`;
DROP procedure IF EXISTS `push_pop_img_path`;

DELIMITER $$
USE `xkrizv03`$$
CREATE PROCEDURE `push_pop_img_path` (IN new_path VARCHAR(256), IN search_u_id INTEGER)
BEGIN

SELECT `img_path` FROM `users` WHERE `u_id` = search_u_id FOR UPDATE;

UPDATE `users`
SET    `img_path` = new_path
WHERE  `u_id` = search_u_id;

COMMIT;
END$$

DELIMITER ;