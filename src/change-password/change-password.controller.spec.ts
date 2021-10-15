import { Test, TestingModule } from "@nestjs/testing";
import { ChangePasswordController } from "./change-password.controller";
import { ChangePasswordService } from "./change-password.service";

describe("ChangePasswordController", () => {
    let controller: ChangePasswordController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChangePasswordController],
            providers: [ChangePasswordService],
        }).compile();

        controller = module.get<ChangePasswordController>(
            ChangePasswordController,
        );
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
