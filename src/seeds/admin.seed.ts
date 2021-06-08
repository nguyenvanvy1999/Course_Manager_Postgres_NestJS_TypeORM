import { configService } from 'src/common/config';
import { Account } from 'src/core/account/models';
import { hashPassword } from 'src/core/auth/tools';
import { Role } from 'src/core/role/models';
import { Admin, User } from 'src/core/user/models';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.transaction(async (manager) => {
      const roleRepository = manager.getRepository(Role);
      const userRole = await roleRepository.findOneOrFail({
        name: 'ADMIN',
      });
      const newAccount = new Account();
      newAccount.username = 'admin';
      newAccount.password = await hashPassword(
        configService.getAdminPassword(),
      );
      await manager.save(newAccount);
      const newUser = new User();
      newUser.email = 'admin@ongdev.com';
      newUser.account = newAccount;
      newUser.roles = [userRole];
      newUser.fullName = 'Ong Dev';
      await manager.save(newUser);
      const newAdmin = new Admin();
      newAdmin.user = newUser;
      await manager.save(newAdmin);
    });
  }
}
