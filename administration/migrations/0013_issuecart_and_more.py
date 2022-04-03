# Generated by Django 4.0.1 on 2022-04-01 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0012_remove_shipment_shipment_date_shipment_shipment_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='IssueCart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveBigIntegerField()),
                ('object_type', models.CharField(choices=[('CHEMICAL', 'Chemical'), ('GLASSWARE', 'Glassware'), ('INSTRUMENT', 'Instrument')], max_length=10)),
                ('quantity', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RenameField(
            model_name='chemicalissue',
            old_name='new_quantity',
            new_name='old_total',
        ),
        migrations.RenameField(
            model_name='chemicalissue',
            old_name='old_quantity',
            new_name='quantity',
        ),
        migrations.RenameField(
            model_name='glasswareissue',
            old_name='new_quantity',
            new_name='old_total',
        ),
        migrations.RenameField(
            model_name='glasswareissue',
            old_name='old_quantity',
            new_name='quantity',
        ),
        migrations.RenameField(
            model_name='instrumentissue',
            old_name='new_quantity',
            new_name='old_total',
        ),
        migrations.RenameField(
            model_name='instrumentissue',
            old_name='old_quantity',
            new_name='quantity',
        ),
        migrations.RemoveField(
            model_name='chemicaltempshipment',
            name='old_total',
        ),
        migrations.RemoveField(
            model_name='glasswaretempshipment',
            name='old_total',
        ),
        migrations.RemoveField(
            model_name='instrumenttempshipment',
            name='old_total',
        ),
        migrations.RemoveField(
            model_name='storeissue',
            name='note',
        ),
        migrations.AlterField(
            model_name='chemicaltempshipment',
            name='quantity',
            field=models.FloatField(),
        ),
    ]