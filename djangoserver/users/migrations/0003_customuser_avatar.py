# Generated by Django 3.0.3 on 2020-03-09 12:13

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20200308_1417'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='avatar',
            field=imagekit.models.fields.ProcessedImageField(default=1, upload_to='img/users/avatars'),
            preserve_default=False,
        ),
    ]
