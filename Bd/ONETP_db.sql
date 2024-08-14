SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ONETP_ER
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ONETP_ER
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ONETP_ER` DEFAULT CHARACTER SET utf8 ;
USE `ONETP_ER` ;

-- -----------------------------------------------------
-- Table `ONETP_ER`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`product` (
  `idproduct` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(100) NOT NULL,
  `desc` VARCHAR(255) NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock` INT NULL,
  PRIMARY KEY (`idproduct`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ONETP_ER`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(65) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `CP` VARCHAR(10) NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC)
  );


-- -----------------------------------------------------
-- Table `ONETP_ER`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`cart` (
  `idcart` INT NOT NULL AUTO_INCREMENT,
  `cart_user` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`idcart`, `cart_user`),
  INDEX `fk_cart_user_idx` (`cart_user` ASC),
  CONSTRAINT `fk_cart_user`
    FOREIGN KEY (`cart_user`)
    REFERENCES `ONETP_ER`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ONETP_ER`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`order` (
  `idorder` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NOT NULL,
  `cart_user` VARCHAR(16) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` DECIMAL(10,2) NOT NULL,
  `operation_state` ENUM('pending', 'processed', 'shipped', 'delivered', 'canceled') NOT NULL,
  `user_order` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`idorder`),
  INDEX `fk_order_cart1_idx` (`cart_id` ASC, `cart_user` ASC),
  INDEX `fk_order_user1_idx` (`user_order` ASC),
  CONSTRAINT `fk_order_cart1`
    FOREIGN KEY (`cart_id` , `cart_user`)
    REFERENCES `ONETP_ER`.`cart` (`idcart` , `cart_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_order`)
    REFERENCES `ONETP_ER`.`user` (`username`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ONETP_ER`.`cart_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`cart_has_product` (
  `cart_id` INT NOT NULL,
  `cart_user_p` VARCHAR(16) NOT NULL,
  `product_id` INT NOT NULL,
  `amount_prod` INT NOT NULL,
  PRIMARY KEY (`cart_id`, `cart_user_p`, `product_id`),
  INDEX `fk_cart_has_product_product1_idx` (`product_id` ASC),
  INDEX `fk_cart_has_product_cart1_idx` (`cart_id` ASC, `cart_user_p` ASC),
  CONSTRAINT `fk_cart_has_product_cart1`
    FOREIGN KEY (`cart_id` , `cart_user_p`)
    REFERENCES `ONETP_ER`.`cart` (`idcart` , `cart_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `ONETP_ER`.`product` (`idproduct`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ONETP_ER`.`payment_method`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`payment_method` (
  `id_paymeth` INT NOT NULL AUTO_INCREMENT,
  `method` ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer') NOT NULL,
  `details` VARCHAR(255) NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `user_id` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`id_paymeth`),
  INDEX `fk_payment_method_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_payment_method_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ONETP_ER`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ONETP_ER`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`payment` (
  `idpayment` INT NOT NULL AUTO_INCREMENT,
  `payment_method_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `payment_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
  PRIMARY KEY (`idpayment`),
  INDEX `fk_payment_payment_method1_idx` (`payment_method_id` ASC),
  INDEX `fk_payment_order1_idx` (`order_id` ASC),
  CONSTRAINT `fk_payment_payment_method1`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `ONETP_ER`.`payment_method` (`id_paymeth`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `ONETP_ER`.`order` (`idorder`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ONETP_ER`.`shipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ONETP_ER`.`shipment` (
  `idshipment` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `street` VARCHAR(60) NOT NULL,
  `height` INT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `state` ENUM('preparation', 'in_transit', 'delivered', 'returned', 'canceled', 'error') NOT NULL,
  PRIMARY KEY (`idshipment`),
  INDEX `fk_shipment_order1_idx` (`order_id` ASC),
  CONSTRAINT `fk_shipment_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `ONETP_ER`.`order` (`idorder`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


