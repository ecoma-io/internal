import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsInt, IsNumber, IsOptional, IsString, Matches, Min, MinLength } from 'class-validator';
import { IResponseDTO } from '../../../core/dto/response.interface';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @Expose()
  firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(6)
  @Expose()
  password?: string;
}

export class LoginByPassswordDto {
  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Expose()
  password: string;

}


export class LoginByOTPDto {
  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'OTP must be exactly 6 digits' })
  @Expose()
  otp?: string;

}

export class AuthResponseDataDto {

  @ApiProperty()
  @Expose()
  token: string;

  @ApiProperty()
  @Expose()
  passwordSetNeeded: boolean;

}

export class AuthResponseDto implements IResponseDTO<AuthResponseDataDto> {
  @ApiProperty()
  @Expose()
  success: boolean;

  @ApiProperty()
  @Expose()
  data?: AuthResponseDataDto;
}

export class ResetPasswordRequestDto {
  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @Expose()
  token: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Expose()
  newPassword: string;
}
