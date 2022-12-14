-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL DEFAULT 'public',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT 'public',
    `tipo` ENUM('file', 'link') NOT NULL,
    `tamanho` VARCHAR(191) NULL DEFAULT '',
    `tamanho_completo` INTEGER NULL DEFAULT 0,
    `caminho` VARCHAR(191) NULL DEFAULT '',
    `link` VARCHAR(191) NOT NULL,
    `link_encurtado` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `clicks` INTEGER NOT NULL DEFAULT 0,

    INDEX `Links_email_fkey`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Links` ADD CONSTRAINT `Links_email_fkey` FOREIGN KEY (`email`) REFERENCES `Usuarios`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
