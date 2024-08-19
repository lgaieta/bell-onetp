SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `ONETP_ER` DEFAULT CHARACTER SET utf8 ;
USE `ONETP_ER` ;

-- -----------------------------------------------------
-- product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`product` (
  `idproduct` VARCHAR(50) NOT NULL,
  `product_name` VARCHAR(100) NOT NULL,
  `product_desc` VARCHAR(255) NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock` INT NULL,
  PRIMARY KEY (`idproduct`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`users` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(65) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `CP` VARCHAR(10) NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);


-- -----------------------------------------------------
-- orders
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`orders` (
  `idorder` INT NOT NULL AUTO_INCREMENT,
  `user_order` VARCHAR(16) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` DECIMAL(10,2) NOT NULL,
  `operation_state` ENUM('pending', 'processed', 'shipped', 'delivered', 'canceled') NOT NULL,
  PRIMARY KEY (`idorder`),
  INDEX `fk_order_user1_idx` (`user_order` ASC) VISIBLE,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_order`)
    REFERENCES `ONETP_ER`.`users` (`username`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- payment_method
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`payment_method` (
  `id_paymeth` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(16) NOT NULL,
  `method` ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer') NOT NULL,
  `details` VARCHAR(255) NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_paymeth`),
  INDEX `fk_payment_method_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_payment_method_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ONETP_ER`.`users` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- payment
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`payment` (
  `idpayment` INT NOT NULL AUTO_INCREMENT,
  `payment_method_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `payment_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
  PRIMARY KEY (`idpayment`),
  INDEX `fk_payment_payment_method1_idx` (`payment_method_id` ASC) VISIBLE,
  INDEX `fk_payment_order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_payment_payment_method1`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `ONETP_ER`.`payment_method` (`id_paymeth`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `ONETP_ER`.`orders` (`idorder`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- shipment
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`shipment` (
  `idshipment` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `street` VARCHAR(60) NOT NULL,
  `height` INT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `state` ENUM('preparation', 'in_transit', 'delivered', 'returned', 'canceled', 'error') NOT NULL,
  PRIMARY KEY (`idshipment`),
  INDEX `fk_shipment_order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_shipment_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `ONETP_ER`.`orders` (`idorder`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- orders_has_product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`orders_has_product` (
  `orders_idorder` INT NOT NULL,
  `product_idproduct` VARCHAR(50) NOT NULL,
  `amount_prod` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`orders_idorder`, `product_idproduct`),
  INDEX `fk_orders_has_product_product1_idx` (`product_idproduct` ASC) VISIBLE,
  INDEX `fk_orders_has_product_orders1_idx` (`orders_idorder` ASC) VISIBLE,
  CONSTRAINT `fk_orders_has_product_orders1`
    FOREIGN KEY (`orders_idorder`)
    REFERENCES `ONETP_ER`.`orders` (`idorder`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_has_product_product1`
    FOREIGN KEY (`product_idproduct`)
    REFERENCES `ONETP_ER`.`product` (`idproduct`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
