import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Create a product
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new product (for admin purposes)',
  })
  @ApiBody({
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Admin role required',
  })
  @ApiResponse({
    status: 409,
    description: 'Sku already exists',
  })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productsService.create(createProductDto);
  }

  // Get all products
  @Get()
  @ApiOperation({
    summary: 'Get all products with optional filters',
  })
  @ApiResponse({
    status: 200,
    description: 'List of products with pagination',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ProductResponseDto' },
        },

        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  })
  async findAll(@Query() queryDto: QueryProductDto) {
    return await this.productsService.findAll(queryDto);
  }

  // Get product by ID
  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Product details',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return await this.productsService.findOne(id);
  }

  // Update a product
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a product (for admin purposes)',
  })
  @ApiBody({
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 409,
    description: 'SKU already exists',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productsService.update(id, updateProductDto);
  }

  // Update product stock
  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update product stock (for admin purposes)',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quantity: {
          type: 'number',
          description:
            'Stock adjustment (positive to add, negative to subtract) ',
        },
      },
      required: ['quantity'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Stock updated successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Insufficient stock',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async updateStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ): Promise<ProductResponseDto> {
    return await this.productsService.updateStock(id, quantity);
  }

  // Delete a product
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete product (for admin purposes)',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Cannot delete product in active orders',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.productsService.remove(id);
  }
}
