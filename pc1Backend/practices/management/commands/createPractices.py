from django.core.management.base import BaseCommand, CommandError
from practices.models import DailySummary, Practice, Entity, Provider
from django.db.utils import IntegrityError
import csv
import os


class Command(BaseCommand):
	help = "create Practice objects from csv file data.  The file must have column headers of Practice name in Column A"

	def add_arguments(self, parser):
		parser.add_argument('data_file', type=str)

	def handle(self, *args, **options):
		file = options['data_file']
		total_created = 0
		total_skipped = 0
		duplicate_dates = []
		skipped_lines = []
		integrity_error = False
		print('')

		with open(file, newline='',	encoding='utf-8-sig') as csvfile:
			reader = csv.reader(csvfile)

			for linenum, line in enumerate(reader):
				if linenum != 0:
					if line[0] != "":
						try:
							entity=Entity.objects.get(name=line[1].strip())
							Practice.objects.create(name = line[0].strip(), entity=entity)
						except Exception as e:
							total_skipped += 1
							skipped_lines.append(line[0])
							print(e)
						else: 
							total_created+= 1
					else:
						total_skipped += 1
		print('{} File lines were skipped'.format(total_skipped))
		print('{} Practices were created'.format(total_created))
		
			